import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// "/editComment/:postId/:commentId"

//     api/user/posts/comments/:postId/:commentId",
// get a single comment  ->>  "/singleComment/:commentId

const EditComment = () => {
    const { postId, commentId } = useParams();
    const navigate = useNavigate()
    const [comment, setComment] = useState("");
    const [input, setInput] = useState('')
    console.log(comment);

    async function handleEditComment(e) {
        e.preventDefault()
        try {
            const editedComment = await axios.put(`/api/user/posts/comments/${postId}/${commentId}`, { commentText: input }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            if (editedComment.data) {
                navigate(-1)
            }
            console.log(editedComment.data)

        } catch (err) {
            console.log(err)
        }
    }

    async function getComment() {
        try {
            let foundComment = await axios.get(
                `/api/user/posts/comments/singleComment/${commentId}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            setComment(foundComment.data.comment);
            setInput(foundComment.data.comment.commentText)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getComment();
    }, []);

    return (
        comment && (
            <div>
                <div>
                    <form className="m-3" onSubmit={handleEditComment}>
                        <label htmlFor="text">Comment Text</label>
                        <br></br>
                        <textarea name="" id="" cols="50" rows="3" onChange={(e) => setInput(e.target.value)} value={input} className="border-2 ">
                        </textarea>
                        <br />
                        <button type="submit" className="p-2 mr-2 bg-indigo-300">Save</button>
                        <button onClick={() => navigate(-1)} type="reset" className="p-2 bg-slate-300">Cancel</button>
                    </form>
                </div>
            </div>
        )
    );
};

export default EditComment;
