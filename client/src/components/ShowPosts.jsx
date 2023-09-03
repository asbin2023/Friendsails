import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowPosts = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    async function getPosts() {
        let token = localStorage.getItem("token");
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

    function sendToEdit(id) {
        navigate(`/post/edit/${id}`);
    }

    async function deletePost(postId) {
        let token = localStorage.getItem("token");
        try {
            await axios.delete(`/api/user/posts/${postId}`, {
                headers: {
                    Authorization: token,
                },
            });
            navigate(0);
        } catch (err) {
            console.log(err);
        }
    }

    return posts.length > 0 ? (
        <div>
            <div className="p-20 pt-10">
                {posts.map((item) => {
                    const createdAt = new Date(item.createdAt);
                    const newData = createdAt.toLocaleDateString();
                    const newTime = createdAt.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    });
                    return (
                        <div className="p-2" key={item._id}>
                            <div className="flex w-2/5 justify-between">
                                <h1 className="font-bold">{item.title}</h1>
                                <div className="flex">
                                    <button
                                        onClick={() => deletePost(item._id)}
                                        className="bg-red-200 p-1 text-white"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => sendToEdit(item._id)}
                                        className=" ml-1 p-1 text-white bg-blue-500"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                            {item.image && (
                                <img className="p-2" src={item.image} width={400} />
                            )}
                            <p className="p-2 border-4 border-red-300">{item.body}</p>
                            <h2>comments</h2>
                            <ul>
                                {item.comments.length > 0 ? item.comments.map((comment) => {
                                    return <div key={comment._id}>
                                        {comment.commentText} by {comment.user}
                                    </div>
                                }) : <p>0 Comments</p>}
                            </ul>
                            <h1 className=" border-2 p-1">
                                posted by: {item.author}     on {newTime} at {newData}
                            </h1>

                        </div>
                    );
                })}
            </div>
        </div>
    ) : (
        <p className="p-3">You currently have no posts!</p>
    );
};

export default ShowPosts;
