import React, { useEffect, useState } from 'react';
import { fetchGetWithAuth } from '../security/fetchWithAuth';
import './MyProfile.css';

const MyProfile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGetWithAuth("/users/me")
            .then((data) => setProfile(data))
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <div className="my-profile error">Error: {error}</div>;
    if (!profile) return <div className="my-profile loading">Loading...</div>;

    return (
        <div className="my-profile-container" aria-labelledby="profile-heading">
            <div className="my-profile-card" aria-labelledby="profile-info-heading">
                <h3 tabIndex={0} aria-label={`Hello, ${profile.username}`}>Hello, {profile.username} 👋</h3>
                <p tabIndex={0}><strong>Email:</strong> <span aria-label={`Email address: ${profile.email}`}>{profile.email}</span></p>
                <p tabIndex={0}><strong>Joined:</strong> <span aria-label={`Joined on ${new Date(profile.createdAt).toLocaleDateString()}`}>
                    {new Date(profile.createdAt).toLocaleDateString()}
                </span></p>
            </div>

            <div className="my-profile-posts">
                <h4 tabIndex={0} aria-label={`Your posts`}>Your Posts</h4>
                {profile.posts && profile.posts.length > 0 ? (
                    profile.posts.map((post) => (
                        <div key={post.id} className="post-item">
                            <p ><span tabIndex={0} aria-label={`${post.content}`}>{post.content}</span></p>
                            <small><span tabIndex={0} aria-label={`${new Date(post.createdAt).toLocaleString()}`}>{new Date(post.createdAt).toLocaleString()}</span></small>
                        </div>
                    ))
                ) : (
                    <p className="no-posts"><span tabIndex={0} aria-label={`no posts`}>You haven’t posted anything yet.</span></p>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
