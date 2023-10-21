import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";






const PostForm = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    let token = localStorage.getItem('token')


    const [image, setImage] = useState("");

    async function handleFormSubmit(e) {
        e.preventDefault();
        try {
            let data = {
                title,
                body,
                image,
            };
            await axios.post("/api/user/posts", data, {
                headers: {
                    Authorization: token
                }
            });
            console.log('im here')
            navigate('/dash')
            //title. body, image is opt
        } catch (err) {
            console.log(err);
        }
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        const render = new FileReader();
        render.onloadend = () => setImage(render.result);
        render.readAsDataURL(file);
    }

    return (
        <div className="sm:ml-64">
            <form className="" onSubmit={handleFormSubmit}>
                <div>
                    <h1 className="">Post Creation:</h1>
                    <br />
                    <label htmlFor="title" className="">Post title:</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="your post title"
                        className=""
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="body" className="">Post body content:</label>
                    <textarea
                        id="body"
                        cols="20"
                        required
                        placeholder="ur text body"
                        className=""
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows="3"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="image" className="">Include an image? (optional)</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className=""
                        onChange={handleImageChange}
                    />
                </div>
                <div className="">
                    <button type="submit" className="postform-submit-button">Post</button>
                    <button type="reset" onClick={() => navigate(-1)} className="">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );

};

export default PostForm;
