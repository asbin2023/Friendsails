import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

// addComment/:postId

// api/user/posts/comments/:postId

// delete comment
// api/user/posts/comments/:postId/:commentId"

const FriendPosts = () => {
    const { postId } = useParams();
    // let username = localStorage.getItem('username')
    let token = localStorage.getItem('token')

    const navigate = useNavigate()
    const [post, setPost] = useState("");
    const [input, setInput] = useState("");
    const [profile, setProfile] = useState('')



    async function getPost() {
        const foundPost = await axios.get(`/api/user/posts/${postId}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });

        const res = await axios.get(`/api/user/profile/${foundPost.data.post.author}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })

        setProfile(res.data.userProfile)

        setPost(foundPost.data.post);
    }
    useEffect(() => {
        getPost();

    }, []);



    async function handleCommentSubmit(e) {
        e.preventDefault()
        try {
            await axios.post(`/api/user/posts/comments/${postId}`, { commentText: input }, {
                headers: {
                    Authorization: token
                }
            })
            navigate(0)
        } catch (err) {
            console.log(err)
        }
    }
    async function handleCommentDelete(id) {
        try {

            let x = await axios.delete(`/api/user/posts/comments/${postId}/${id}`, {
                headers: {
                    Authorization: token
                }
            })

            navigate(0)
        } catch (err) {
            console.log(err)
        }
    }
    // "/editComment/:postId/:commentId"
    function handleCommentEdit(id) {
        navigate(`/editComment/${postId}/${id}`)

    }


    return post && profile ? (
        <div className="addcom-main-div">
            <button onClick={() => navigate(-1)} className="addcom-back-button">
                g o <span className="hideme">bbb</span> b a c k
            </button>
            <div className="addcom-map-div">

                <div className="addcom-okay1">
                    <img
                        src={profile ? profile.picture : null}
                        height={48}
                        width={48}
                        alt=""
                    />
                    <div className="addcom-okay2">
                        <p id="addcom-name"> {profile ? profile.name : '@' + post.author}</p>
                        <p>{profile && '@' + post.author}</p>
                        <p> {new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>

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
                <hr />
                <hr />
                <hr />
                <hr /><hr /><hr />
                <div>
                    <textarea
                        className="addcom-textarea"
                        required
                        rows="3"
                        cols={45}
                        placeholder="enter your comment here"
                        onChange={(e) => setInput(e.target.value)}
                    ></textarea>
                    <button type="submit" className="addcom-form-btn">
                        comment
                    </button>
                </div>
                <hr />
                <hr />
                <hr />
                <hr /><hr /><hr />
            </form>



            <p className="addcom-bigh1">c o m m e n t s:</p>
            {post.comments.length > 0 ? (
                post.comments.map((comment) => {
                    return (
                        <div className="addcom-contain-map" key={comment._id}>
                            <div className="addcom-comment-fixme">
                                <img src={comment.userPicture ? comment.userPicture : null} height={48} width={48} alt="" />
                                <div>
                                    <p className="addcom-notfaded"> {comment.name ? comment.name : '@' + comment.user} </p>
                                    <p className="addcom-faded">{comment.name && '@' + comment.user}</p>
                                    <p className="addcom-faded">{new Date(comment.createdAt).toLocaleDateString()}</p>
                                </div>
                                {comment.user === localStorage.getItem('username') && <>
                                    <button
                                        onClick={() => handleCommentDelete(comment._id)}
                                        className="addcom-last-div-button-delete"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleCommentEdit(comment._id)}
                                        className="addcom-last-div-button-edit"
                                    >
                                        Edit
                                    </button>
                                </>}
                            </div>
                            <p className="addcom-ptag-comment" >

                                {comment.commentText} <span>{comment.edited && "(edited)"}</span>


                            </p>



                        </div>
                    );
                })
            ) : (
                <p style={{ marginTop: '20px' }}>no comments to display..</p>
            )}
        </div>


    ) : (
        <p>no post</p>
    );
};

export default FriendPosts
