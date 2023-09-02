import axios from "axios";
import { useEffect, useState } from "react";


const ShowPosts = () => {
    const [posts, setPosts] = useState([]);

    async function getPosts() {
        const token = localStorage.getItem("token");
        try {
            const posts = await axios.get("/api/user/posts", {
                headers: {
                    Authorization: token,
                },
            });
            setPosts(posts.data.posts);
        } catch (err) {
            console.log(err);
        }
    }
    console.log(posts)

    useEffect(() => {
        getPosts();
    }, []);

    async function deletePost(e) {

    }


    return (
        posts && (
            <div>

                <div className="p-20 pt-10">
                    <h1>posts</h1>
                    {posts.map(item => {
                        const createdAt = new Date(item.createdAt)
                        const newData = createdAt.toLocaleDateString()
                        const newTime = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        return <div className="p-2" key={item._id}>

                            <div className="flex w-2/5 justify-between">
                                <h1 className="font-bold">{item.title}</h1>
                                <button className="bg-red-200 p-1 text-white">Delete</button>
                            </div>
                            {item.image && <img className="p-2" src={item.image} width={400} />}
                            <p>{item.body}</p>
                            <h1 className=" underline underline-offset-4">posted by: {item.user.username}:</h1>
                            <p>created on {newTime} at {newData}</p>

                        </div>
                    })}

                </div>

            </div>
        )
    );
};

export default ShowPosts;
