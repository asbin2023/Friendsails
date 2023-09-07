import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowPosts from "../components/ShowPosts";
import ProfileNew from "./ProfileNew";
import "../styles/profile.css";
import { MdOutlineLocationOn } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

const Profile = () => {
    const [profile, setProfile] = useState("");
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate()

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
        setToggle(false);
    }, []);

    return !profile ? (
        <div>
            <p>
                Looks like your profile is empty. Click here to set up your profile.
            </p>
            <button onClick={() => setToggle(!toggle)}>Setup</button>

            {toggle && <ProfileNew />}
        </div>
    ) : (
        <div className="profile-main-div">
            <div className="profile-first-div">
                <img src={profile.picture} alt="" />
                <div>
                    <p className="profile-name">{profile.name}</p>
                    <p className="profile-username"> @{profile.username}</p>
                    <p className="profile-location">

                        <MdOutlineLocationOn />
                        {profile.location}
                    </p>
                </div>
                <span className="profile-edit-btn" onClick={() => navigate('/edit/profile')}>

                    <AiFillEdit />
                </span>
            </div>
            <div className="profile-last">
                <p className="profile-about">
                    <br />
                    <span>a b o u t <span style={{ opacity: '0' }}>o</span> m e:</span> <br /><br />
                    {profile.about}
                </p>

                <div>
                    <ShowPosts />
                </div>
            </div>
        </div>
    );
};

export default Profile;
