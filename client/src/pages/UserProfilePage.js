import React from 'react';
import UserProfile from '../components/UserProfile';
import './UserProfilePage.css';

const UserProfilePage = () => {
    return (
        <div className="user-profile-page">
            <h2 tabIndex={0} aria-label = 'user Profile'>User Profile</h2>
            <UserProfile />
        </div>
    );
};

export default UserProfilePage;
