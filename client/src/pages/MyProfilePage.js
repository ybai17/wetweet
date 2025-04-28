import React from 'react';
import MyProfile from '../components/MyProfile';
import './MyProfilePage.css';

const MyProfilePage = () => {
    return (
        <div className="my-profile-page">
            <h2 tabIndex={0} aria-label = 'My Profile'>My Profile</h2>
            <MyProfile />
        </div>
    );
};

export default MyProfilePage;