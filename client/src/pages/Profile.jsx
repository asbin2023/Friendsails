import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowPosts from "../components/ShowPosts";
import ProfileNew from "./ProfileNew";
import '../styles/profile.css'


const Profile = () => {
    const [profile, setProfile] = useState("");
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        async function getProfile() {
            try {
                const foundProfile = await axios.get(
                    `api/user/profile/${localStorage.getItem("username")}`,
                    {
                        headers: {
                            Authorization: localStorage.getItem("token"),
                        },
                    }
                );
                setProfile(foundProfile.data.userProfile);
            } catch (err) {
                console.log(err);
            }
        }
        getProfile();
        setToggle(false)
    }, []);

    return !profile ? (
        <div>
            <p>

                Looks like your profile is empty. Click here to set up your profile.
            </p>
            <button onClick={() => setToggle(!toggle)}>Setup</button>

            {toggle &&
                <ProfileNew />}

        </div>
    ) : (
        <div>
            <div className="p-20 m-10">
                <h1>Name: {profile.name}</h1>
                <h1>username: {profile.username}</h1>
                <img src={profile.picture} width={50} alt="" />

                <h2>Location: {profile.location}</h2>
                <a href={profile.link}>Link</a>
                <h1>About: {profile.about}</h1>
            </div>
            <div className="p-20">
                <h1> Your posts:</h1>
                <ShowPosts />
            </div>
        </div>
    );
};

export default Profile;
