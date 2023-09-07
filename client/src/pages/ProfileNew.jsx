import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ProfileNew = () => {
    const [picture, setPicture] = useState("");
    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [location, setLocation] = useState("");

    async function handleProfileSubmit(e) {
        e.preventDefault();
        try {
            let data = {
                picture,

                name,
                about,
                location,
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

    return <div>
        <form onSubmit={handleProfileSubmit} className="editprofile-main-div">
            <div className="editprofile-div">
                <h1 className="editprofile-opening">Profile Creation:</h1>
                <label htmlFor="name">your name:</label>
                <input
                    className="editprofile-input"

                    type="text"
                    id="name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="editprofile-div">
                <label htmlFor="location">your location:</label>
                <input
                    className="editprofile-input"
                    type="text"
                    id="location"
                    value={location}
                    required
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>

            <div className="editprofile-div">
                <label htmlFor="about">your about me:</label>
                <textarea
                    rows={3}
                    className="editprofile-textarea"

                    type="text"
                    id="about"
                    value={about}
                    required
                    onChange={(e) => setAbout(e.target.value)}
                />
            </div>
            <div className="editprofile-div">
                <label htmlFor="picture">Include your profile pic</label>
                <input
                    className="editprofile-file"
                    type="file"
                    id="picture"
                    accept="image/*"
                    onChange={handlePictureChange}
                />
            </div>

            <div className="editprofile-div editprofile-buttons">
                <button type="submit" className="editprofile-submit">
                    Submit
                </button>
                <button onClick={() => navigate(-1)} type="reset" className="editprofile-clear">
                    Cancel
                </button>
            </div>
        </form>
    </div>

};

export default ProfileNew;
