import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ProfileNew = () => {
    const [picture, setPicture] = useState("");
    const [background, setBackground] = useState("");
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [location, setLocation] = useState("");
    const [link, setLink] = useState("");

    async function handleProfileSubmit(e) {
        e.preventDefault();
        try {
            let data = {
                picture,
                background,
                name,
                about,
                location,
                link,
            };
            const res = await axios.post("/api/user/profile", data, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            window.location.reload();
            console.log(res.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    function handlePictureChange(e) {
        const file = e.target.files[0];
        const render = new FileReader();
        render.onloadend = () => setPicture(render.result);
        render.readAsDataURL(file);
    }
    function handleBackgroundChange(e) {
        const file = e.target.files[0];
        const render = new FileReader();
        render.onloadend = () => setBackground(render.result);
        render.readAsDataURL(file);
    }
    return (
        <div>
            <form
                onSubmit={handleProfileSubmit}
                className="flex m-3 flex-col gap-3"
            >
                <label htmlFor="name">your name:</label>
                <input
                    className="p-1 bg-slate-100 outline-none border-1"
                    type="text"
                    id="name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="location">your location:</label>
                <input
                    className="p-1 bg-slate-100 outline-none border-1"
                    type="text"
                    id="location"
                    value={location}
                    required
                    onChange={(e) => setLocation(e.target.value)}
                />
                <label htmlFor="link">your link:</label>
                <input
                    className="p-1 bg-slate-100 outline-none border-1"
                    type="text"
                    id="link"
                    value={link}
                    required
                    onChange={(e) => setLink(e.target.value)}
                />
                <label htmlFor="about">your about me:</label>
                <textarea
                    rows={3}
                    className="p-1 bg-slate-100 outline-none border-1 resize-none"
                    type="text"
                    id="about"
                    value={about}
                    required
                    onChange={(e) => setAbout(e.target.value)}
                />
                <label htmlFor="picture">Include your profile pic</label>
                <input
                    required
                    type="file"
                    id="picture"
                    accept="image/*"
                    onChange={handlePictureChange}
                />
                <label htmlFor="background">Include your background pic</label>
                <input
                    required
                    type="file"
                    id="background"
                    accept="image/*"
                    onChange={handleBackgroundChange}
                />
                <div className="flex justify-evenly">
                    <button type="submit" className="p-1.5 bg-blue-600 text-white">
                        Submit
                    </button>
                    <button type="reset" className="p-1.5 bg-red-200 text-white">
                        Clear
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProfileNew
