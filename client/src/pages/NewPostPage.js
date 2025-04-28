import React from 'react';
import NewPost from '../components/NewPost';
import './NewPostPage.css';

const NewPostPage = () => {
    return (
        <div className="new-post-page">
            <h2 tabIndex={0} aria-label = 'Create new post'>Create New Post</h2>
            <NewPost />
        </div>
    );
};

export default NewPostPage;
