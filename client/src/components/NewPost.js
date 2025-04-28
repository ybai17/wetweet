import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPostWithAuth } from "../security/fetchWithAuth";
import "./NewPost.css";

const NewPost = () => {
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            await fetchPostWithAuth("/posts", {
                content,
            });

            setMessage("Post created successfully!");
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
        <div className="new-post-container">

            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="content">Post Content:</label>
                <br />
                <textarea
                    id="content"
                    aria-label="text area"
                    className="new-post-textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="5"
                    placeholder="Write your post here..."
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
                    {loading ? "Submitting..." : "Add Post"}
                </button>
            </form>
        </div>
    );
};

export default NewPost;
