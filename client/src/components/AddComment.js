import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPostWithAuth } from "../security/fetchWithAuth";
import "./AddComment.css";

const debug_mode = false;

function AddComment({ postId }) {
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if (debug_mode) {
        console.log("Inside AddComment function postId:");
        console.log(postId);
    }
        
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            await fetchPostWithAuth(`/posts/${postId}/comments`, {
                content,
                postId: postId,
            });

            setMessage("Comment added successfully!");
            setContent("");
            setTimeout(() => navigate("/itemlist"), 1000);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="new-comment-container">

            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="content">Write a comment:</label>
                <br />
                <textarea
                    id="content"
                    aria-label="text area"
                    className="new-post-textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="5"
                    placeholder="Write your comment here..."
                    maxLength={500}
                    autoFocus
                    required
                />
                <br />
                <button
                    aria-label="submit button"
                    type="submit"
                    className="new-post-button"
                    disabled={loading || !content.trim()}
                >
                    {loading ? "Submitting..." : "Add Comment"}
                </button>
            </form>
        </div>
    );
};

export default AddComment;
