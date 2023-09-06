import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../styles/postform.css'





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
        <div className="postform-main-div">
            <form className="postform-container" onSubmit={handleFormSubmit}>
                <div>
                    <h1 className="postform-creation">Post Creation:</h1>
                    <br />
                    <label htmlFor="title" className="postform-label">Post title:</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="your post title"
                        className="postform-input"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="body" className="postform-label">Post body content:</label>
                    <textarea
                        id="body"
                        cols="20"
                        required
                        placeholder="ur text body"
                        className="postform-textarea"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows="3"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="image" className="postform-label">Include an image? (optional)</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className="postform-file-input"
                        onChange={handleImageChange}
                    />
                </div>
                <div className="postform-buttons">
                    <button type="submit" className="postform-submit-button">Post</button>
                    <button type="reset" onClick={() => navigate(-1)} className="postform-cancel-button">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );

};

export default PostForm;
