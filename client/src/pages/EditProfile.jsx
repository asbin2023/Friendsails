import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const EditProfile = () => {
    const [profile, setProfile] = useState("");
    const [picture, setPicture] = useState("");

    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [location, setLocation] = useState("");

    const navigate = useNavigate();

    async function getProfile() {
        try {
            const res = await axios.get(
                `/api/user/profile/${localStorage.getItem("username")}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            setProfile(res.data.userProfile);
            setPicture(res.data.userProfile.picture);
            setName(res.data.userProfile.name);
            setAbout(res.data.userProfile.about);
            setLocation(res.data.userProfile.location);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getProfile();
    }, []);
    async function handleProfileSubmit(e) {
        e.preventDefault();
        if (
            picture === profile.picture &&
            name === profile.name &&
            about === profile.about &&
            location === profile.location
        ) {
            return navigate("/profile");
        } else {
            // console.log("nope");
        }
        try {
            let data = {
                picture,
                name,
                about,
                location,
            };
            // console.log("data", data);
            const res = await axios.put("/api/user/profile", data, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            console.log(res.data);
            navigate(-1);
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

    return profile ? (
        <div>
            <form onSubmit={handleProfileSubmit} className="editprofile-main-div">
                <div className="editprofile-div">
                    <h1 className="editprofile-opening">Edit Profile:</h1>
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
                    <button onClick={() => navigate('/profile')} type="reset" className="editprofile-clear">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    ) : (
        <p>no such profile found. please try again!</p>
    );
};

export default EditProfile;
