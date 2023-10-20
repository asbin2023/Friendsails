import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


//"/post/edit/:postId"
// api/user/posts/:postId --> for backend put for posts

const EditPost = () => {
    const navigate = useNavigate();

    const [post, setPost] = useState(null);

    const { postId } = useParams();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");

    async function getPost() {
        const foundPost = await axios.get(`/api/user/posts/${postId}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });

        setPost(foundPost.data.post);
        setTitle(foundPost.data.post.title);
        setBody(foundPost.data.post.body);
        setImage(foundPost.data.post.image);
    }
    async function handleFormSubmit(e) {
        e.preventDefault();
        if (title === post.title && body === post.body && image === post.image) {
            console.log("good");
            return navigate(-1);
        }
        try {
            console.log("made it");
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

            navigate(-1);
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
                <form className="editpost-container" onSubmit={handleFormSubmit}>
                    <div>
                        <h1 className="editpost-creation">Edit post:</h1>
                        <br />
                        <label htmlFor="title">Post title:</label>
                        <input
                            className="editpost-input"
                            type="text"
                            id="title"
                            placeholder="your post title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="body">Post body content:</label>
                        <textarea
                            className="editpost-textarea"
                            id="body"
                            cols="20"
                            required
                            placeholder="ur text body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            rows="3"
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="image">Include an image? (optional)</label>
                        <input
                            className="editpost-file-input"
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="editpost-buttons">
                        <button className="editpost-submit-button" type="submit">
                            Save
                        </button>
                        <button
                            type="reset"
                            onClick={() => navigate(-1)}
                            className="editpost-cancel-button"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        )
    );
};

export default EditPost;
