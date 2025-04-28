import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGetWithAuth } from '../security/fetchWithAuth';
import './UserProfile.css';

const UserProfile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        fetchGetWithAuth(`/users/${id}`)
            .then((data) => setProfile(data))
            .catch((err) => setError(err.message));
    }, [id]);


    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    if (!profile) return <p>Loading...</p>;

    return (
        <div className="user-profile-container" aria-labelledby="profile-heading">

            <div className="user-info" aria-labelledby="profile-info-heading">
                <p><strong>ID:</strong><span aria-label={`${profile.id}`}>{profile.id}</span></p>
                <p><strong>Username:</strong><span aria-label={`${profile.username}`}>{profile.username}</span></p>
                <p><strong>Email:</strong><span aria-label={`${profile.email}`}>{profile.email}</span></p>
                <p><strong>Joined:</strong><span aria-label={`${new Date(profile.createdAt).toLocaleDateString()}`}>{new Date(profile.createdAt).toLocaleDateString()}</span></p>
            </div>

            {profile.posts && profile.posts.length > 0 ? (
                <div className="post-list">
                    <h3 tabIndex={0} aria-text={`User's posts`}>User's Posts</h3>
                    {profile.posts.map((post) => (
                        <div className="post-item" key={post.id}>
                            <p tabIndex={0}><span aria-label={`${post.content}`}>{post.content}</span></p>
                            <small tabIndex={0}><span aria-label={`${new Date(post.createdAt).toLocaleString()}`}>{new Date(post.createdAt).toLocaleString()}</span></small>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-posts-msg"><span tabIndex={0} aria-label={`no posts`}>
                    This user has not posted anything yet.</span>
                </p>

            )}
        </div>
    );
};

export default UserProfile;
