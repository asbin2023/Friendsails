import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const OtherProfiles = () => {
    const navigate = useNavigate()
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
        navigate(`/friendPost/${id}`)
    }
    return profile ? (
        <div>
            <div className="p-20 m-10">
                <h1>Name: {profile.name}</h1>
                <h1>username: {profile.username}</h1>
                <img src={profile.picture} width={50} alt="" />
                <img src={profile.background} width={100} alt="" />
                <h2>Location: {profile.location}</h2>
                <a href={profile.link}>Link</a>
                <h1>About: {profile.about}</h1>
            </div>
            <div className="p-20 m-10">
                <h1>{profile.username}'s posts: </h1>
                {posts.length > 0 ? (
                    <div className=" p-10 pt-10">
                        {posts.map((item) => {
                            const createdAt = new Date(item.createdAt);
                            const newData = createdAt.toLocaleDateString();
                            const newTime = createdAt.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            });
                            return (
                                <div
                                    className="border-2 mt-7 p-2 cursor-pointer bg-slate-100"
                                    onClick={() => toFriendsPost(item._id)}
                                    key={item._id}
                                >
                                    <div className="flex w-2/5 justify-between">
                                        <h1 className="font-bold">
                                            {item.title} <span>{item.edited && "(edited)"}</span>
                                        </h1>

                                    </div>
                                    {item.image && (
                                        <img className="p-2" src={item.image} width={400} />
                                    )}
                                    <p className="p-2">{item.body}</p>
                                    <p>{item.comments.length} Comments</p>

                                    <h1 className=" border-2 p-1 bg-orange-200">
                                        posted by:{" "}
                                        {item.author === localStorage.getItem("username")
                                            ? "You"
                                            : item.author}
                                        on {newTime} at {newData}
                                    </h1>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>{profile.username} doesnt have any posts</p>
                )}
            </div>
        </div>
    ) : (
        <p>{username} hasnt set up their profile page.. nothing to display :/</p>
    );
};

export default OtherProfiles;
