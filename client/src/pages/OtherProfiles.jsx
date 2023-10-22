import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MdOutlineLocationOn } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

const OtherProfiles = () => {
    const navigate = useNavigate();
    const { username } = useParams();

    const [profile, setProfile] = useState("");
    const [posts, setPosts] = useState("");

    console.log(posts);
    

    async function getPosts() {
        try {
            const res = await axios.get(`/api/user/posts/general/${username}`, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            setPosts(res.data.posts);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        async function getProfile() {
            try {
                const res = await axios.get(`/api/user/profile/${username}`, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                setProfile(res.data.userProfile);
            } catch (err) {
                console.log(err);
            }
        }
        getProfile();
        getPosts();
    }, []);

    function toFriendsPost(id) {
        navigate(`/friendPost/${id}`);
    }
    return !profile ? (
        <div className = "ml-64">
            <p>
                {username} hasnt set up their profile..
            </p>
        </div>
    ) : (
        <div className="ml-64">
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
            </div>
            <div className="profile-last">
                <p className="profile-about">
                    <br />
                    <span>
                        a b o u t <span style={{ opacity: "0" }}>o</span> m e:
                    </span>{" "}
                    <br />
                    <br />
                    {profile.about}
                </p>

                <div>
                    {posts.length > 0 && (
                        <div className="showposts-main-div">
                            {posts.map((item) => {
                                const createdAt = new Date(item.createdAt);
                                const newDate = createdAt.toLocaleDateString();

                                return (
                                    <div
                                        className="showposts-map-div"
                                        onClick={() => toFriendsPost(item._id)}
                                        key={item._id}
                                    >
                                        <div className="showposts-okay1">
                                            <img
                                                src={profile.picture}
                                                alt=""
                                                height={48}
                                                width={48}
                                            />
                                            <div className="showposts-okay2">
                                                <p id="showposts-name">
                                                    {profile ? profile.name : "@" + item.author}
                                                </p>
                                                <p>{profile && "@" + item.author}</p>
                                                <p>{newDate}</p>
                                            </div>
                                        </div>
                                        <div className="showposts-content">
                                            <h1>
                                                {item.title}{" "}
                                                <span className="showposts-edited-title">
                                                    {item.edited && "(edited)"}
                                                </span>
                                            </h1>

                                            {item.image && (
                                                <img
                                                    className="showposts-image"
                                                    src={item.image}
                                                    width={400}
                                                />
                                            )}
                                            <p>{item.body}</p>
                                        </div>

                                        <p className="showposts-comment">
                                            {item.comments.length} Comments
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OtherProfiles;
