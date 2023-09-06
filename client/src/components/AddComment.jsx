import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/addcomment.css";
import defUser from "../images/default.jpg";

// addComment/:postId

// api/user/posts/comments/:postId

// delete comment
// api/user/posts/comments/:postId/:commentId"

const AddComment = () => {
    const [profile, setProfile] = useState("");
    const { postId } = useParams();
    // let username = localStorage.getItem('username')
    let token = localStorage.getItem("token");

    const navigate = useNavigate();
    const [post, setPost] = useState("");
    const [input, setInput] = useState("");
    console.clear();
    console.log(profile);

    async function getPost() {
        const foundPost = await axios.get(`/api/user/posts/${postId}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });

        setPost(foundPost.data.post);
    }
    useEffect(() => {
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
            } catch (err) {
                console.log(err);
            }
        }
        getProfile();
        getPost();
    }, []);

    async function handleCommentSubmit(e) {
        e.preventDefault();
        try {
            await axios.post(
                `/api/user/posts/comments/${postId}`,
                { commentText: input },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            navigate(0);
        } catch (err) {
            console.log(err);
        }
    }
    async function handleCommentDelete(id) {
        try {
            let x = await axios.delete(`/api/user/posts/comments/${postId}/${id}`, {
                headers: {
                    Authorization: token,
                },
            });

            navigate(0);
        } catch (err) {
            console.log(err);
        }
    }
    // "/editComment/:postId/:commentId"
    function handleCommentEdit(id) {
        navigate(`/editComment/${postId}/${id}`);
    }

    return post ? (
        <div className="addcom-main-div">
            <button onClick={() => navigate(-1)} className="addcom-back-button">
                g o <span className="hideme">bbb</span> b a c k
            </button>
            <div className="addcom-map-div">
                <div className="addcom-okay1">
                    <img
                        src={profile ? profile.picture : defUser}
                        height={48}
                        width={48}
                        alt=""
                    />
                    <div className="addcom-okay2">
                        <p id="addcom-name"> {profile ? profile.name : post.author}</p>
                        <p>{profile && post.author}</p>
                        <p> {new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                    <button className="addcom-delete">Delete</button>
                    <button className="addcom-edit">Edit</button>
                </div>
                <div className="addcom-content">
                    <h1>
                        {post.title}{" "}
                        <span className="addcom-edited-title">
                            {post.edited && "(edited)"}
                        </span>
                    </h1>

                    {post.image && (
                        <img className="addcom-image" src={post.image} width={400} />
                    )}
                    <p>{post.body}</p>
                </div>
            </div>

            <form onSubmit={handleCommentSubmit} className="addcom-form-com">
                <h3> Add a comment:</h3>
                <textarea
                    className="addcom-textarea"
                    required
                    rows="2"
                    cols={40}
                    placeholder="enter your comment here"
                    onChange={(e) => setInput(e.target.value)}
                ></textarea>
                <button type="submit" className="addcom-form-btn">
                    Comment
                </button>
            </form>

            <div className="addcom-last-div">
                <h1>comments:</h1>
                <div className="addcom-before-map">
                    {post.comments.length > 0 ? (
                        post.comments.map((comment) => {
                            return (
                                <div className="addcom-contain-map" key={comment._id}>
                                    <div className="flex gap-10 items-center">
                                        <h1 className="text-lg">
                                            {" "}
                                            <span className="font-bold text-xl">
                                                {comment.commentText} {comment.edited && "(edited)"}
                                            </span>
                                            by{" "}
                                            {comment.user === localStorage.getItem("username")
                                                ? "You"
                                                : comment.user}
                                        </h1>
                                        <button
                                            onClick={() => handleCommentDelete(comment._id)}
                                            className="p-1 m-1 bg-red-200 text-yellow-700"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => handleCommentEdit(comment._id)}
                                            className="p-1 m-1 bg-blue-500 text-white"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <h3 className="p-1 bg-yellow-100 w-5/12">
                                        posted at{" "}
                                        {new Date(comment.createdAt).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}{" "}
                                        on {new Date(comment.createdAt).toLocaleDateString()}
                                    </h3>
                                </div>
                            );
                        })
                    ) : (
                        <p>no comments to display!, add a comment</p>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <p>no post</p>
    );
};

export default AddComment;
