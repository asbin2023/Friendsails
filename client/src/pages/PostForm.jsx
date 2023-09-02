import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const PostForm = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    let token = localStorage.getItem('token')
    console.log(token)

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
        <div>
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
                        Post
                    </button>
                    <Link to='/dash'> <button type="reset" className="bg-red-100 border-2 p-1 ">
                        Cancel
                    </button></Link>
                </div>
            </form>
        </div>
    );
};

export default PostForm;
