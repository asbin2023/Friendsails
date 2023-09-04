import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

//"/post/edit/:postId"
// api/user/posts/:postId --> for backend put for posts

const EditPost = () => {
    const navigate = useNavigate();

    const [post, setPost] = useState(null);

    const { postId } = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");

    async function getPost() {
        const foundPost = await axios.get(`/api/user/posts/${postId}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });

        setPost(foundPost.data.post);
        setTitle(foundPost.data.post.title)
        setBody(foundPost.data.post.body)
        setImage(foundPost.data.post.image)

    }
    async function handleFormSubmit(e) {
        e.preventDefault();
        if (title === post.title && body === post.body && image === post.image) {
            console.log('good')
            return navigate('/dash')
        }
        try {
            console.log('made it')
            let data = {
                title,
                body,
                image,
            };
            await axios.put(`/api/user/posts/${postId}`, data, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });


            navigate("/dash");
            //title. body, image is opt
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getPost();

    }, []);

    function handleImageChange(e) {
        const file = e.target.files[0];
        const render = new FileReader();
        render.onloadend = () => setImage(render.result);
        render.readAsDataURL(file);
    }
    return (
        post && (
            <div>
                <h1>Edit post</h1>
                <form className="flex w-6/12 p-5 flex-col" onSubmit={handleFormSubmit}>
                    <label htmlFor="title">Post title:</label>
                    <input
                        className="border-2 border-black outline-none"
                        type="text"
                        id="title"
                        placeholder="your post title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                    <label htmlFor="body">Post body content:</label>
                    <textarea
                        className="border-2 border-black outline-none"
                        id="body"
                        cols="20"
                        required
                        placeholder="ur text body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows="3"
                    ></textarea>
                    <label htmlFor="image">Include an image? (optional)</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <div className="flex justify-evenly">
                        <button className="bg-green-200 border-2 p-1" type="submit">
                            Save
                        </button>
                        <Link to="/dash">
                            {" "}
                            <button type="reset" className="bg-red-100 border-2 p-1 ">
                                Cancel
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        )
    );
};

export default EditPost;
