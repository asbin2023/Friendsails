import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

// addComment/:postId

// api/user/posts/comments/:postId

// delete comment
// api/user/posts/comments/:postId/:commentId"

const AddComment = () => {
    const { postId } = useParams();
    // let username = localStorage.getItem('username')
    let token = localStorage.getItem('token')

    const navigate = useNavigate()
    const [post, setPost] = useState("");
    const [input, setInput] = useState("");

    async function getPost() {
        const foundPost = await axios.get(`/api/user/posts/${postId}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });

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
            console.log(id)
            console.log(postId)
            let x = await axios.delete(`/api/user/posts/comments/${postId}/${id}`, {
                headers: {
                    Authorization: token
                }
            })
            console.log(x)
            navigate(0)
        } catch (err) {
            console.log(err)
        }
    }


    return post ? (
        <div className="p-14">
            <button onClick={() => navigate(-1)} className="font-bold p-2 mb-5 text-white bg-green-500">back to feed</button>
            <div>
                <h1 className="font-bold">{post.title}</h1>
                <h2>{post.body}</h2>
                <h3>
                    posted at{" "}
                    {new Date(post.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}{" "}
                    on {new Date(post.createdAt).toLocaleDateString()}
                </h3>
            </div>

            <form onSubmit={handleCommentSubmit} className=" p-1 my-2 flex flex-col w-4/12">
                <h1> Add a comment:</h1>
                <textarea
                    className="border-2 outline-none resize-none p-2"
                    required
                    rows="2"
                    cols={40}
                    placeholder="enter your comment here"
                    onChange={(e) => setInput(e.target.value)}
                ></textarea>
                <button type="submit" className="text-left p-1 my-2 bg-blue-200 ">Comment</button>
            </form>
            <div>
                <h1 className="font-bold">comments:</h1>
                <ul>
                    {post.comments.length > 0 ? (
                        post.comments.map((comment) => {
                            return (
                                <div className="m-4" key={comment._id}>
                                    <div className="flex gap-10 items-center">
                                        <h1 className="text-lg">
                                            {" "}
                                            <span className="font-bold text-xl">
                                                {comment.commentText}{" "}
                                            </span>
                                            by {comment.user === localStorage.getItem('username') ? 'You' : comment.user}
                                        </h1>
                                        <button onClick={() => handleCommentDelete(comment._id)} className="p-1 m-1 bg-red-200 text-yellow-700">Delete</button>
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
                </ul>
            </div>
        </div>
    ) : (
        <p>no post</p>
    );
};

export default AddComment;
