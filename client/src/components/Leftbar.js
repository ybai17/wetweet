import React from 'react';
import { useAuthUser } from '../security/AuthContext';

import FriendsIcon from '../assets/1.png';
import GroupsIcon from '../assets/2.png';
import MarketIcon from '../assets/3.png';
import WatchIcon from '../assets/4.png';
import MemoriesIcon from '../assets/5.png';

import EventsIcon from '../assets/6.png';
import GamingIcon from '../assets/7.png';
import GalleryIcon from '../assets/8.png';
import VideosIcon from '../assets/9.png';
import MessagesIcon from '../assets/10.png';

import FundIcon from '../assets/11.png';
import TutorialsIcon from '../assets/12.png';
import CoursesIcon from '../assets/13.png';

import './Leftbar.css';

const LeftBar = () => {
    const { user } = useAuthUser();

    return (
        <div className="leftBar" role="navigation" aria-label="Main navigation">
            <div className="container">

                {/* Section: user */}
                <div className="menu" aria-labelledby="user-section">
                    <div className="user" id="user-section">
                        <span tabIndex="0" aria-label={`${user.username}`}>{user.username}</span>
                    </div>

                    {/* Section 1 */}
                    <div className="item" tabIndex="0" aria-label='friends'>
                        <img src={FriendsIcon} alt="Friends" />
                        <span>Friends</span>
                    </div>
                    <div className="item" tabIndex="0" aria-label='Groups'>
                        <img src={GroupsIcon} alt="Groups" />
                        <span>Groups</span>
                    </div>
                    <div className="item" tabIndex="0" aria-label='Marketplace'>
                        <img src={MarketIcon} alt="Marketplace" />
                        <span>Marketplace</span>
                    </div>
                    <div className="item" tabIndex="0" aria-label='Watch'>
                        <img src={WatchIcon} alt="Watch" />
                        <span>Watch</span>
                    </div>
                    <div className="item" tabIndex="0" aria-label='Memories'>
                        <img src={MemoriesIcon} alt="Memories" />
                        <span>Memories</span>
                    </div>
                </div>

                <hr />

                {/* Section 2 */}
                <div className="menu">
                    <span className="section-title"  tabIndex="0" aria-label={`shortcuts`}>Your shortcuts</span>
                    <div className="item" tabIndex="0" aria-label='Events'>
                        <img src={EventsIcon} alt="Events" />
                        <span>Events</span>
                    </div>
                    <div className="item" tabIndex="0" aria-label='Gaming'>
                        <img src={GamingIcon} alt="Gaming" />
                        <span>Gaming</span>
                    </div>
                    <div className="item" tabIndex="0" aria-label='Gallery'>
                        <img src={GalleryIcon} alt="Gallery" />
                        <span>Gallery</span>
                    </div>
                    <div className="item" tabIndex="0" aria-label='Videos'>
                        <img src={VideosIcon} alt="Videos" />
                        <span>Videos</span>
                    </div>
                    <div className="item" tabIndex="0" aria-label='Messages'>
                        <img src={MessagesIcon} alt="Messages" />
                        <span>Messages</span>
                    </div>
                </div>

                <hr />

                {/* Section 3 */}
                <div className="menu">
                    <span className="section-title" tabIndex="0" aria-label={`menu`}>Others</span>
                    <div className="item" tabIndex="0" aria-label={`Fundraiser`}>
                        <img src={FundIcon} alt="Fundraiser" />
                        <span>Fundraiser</span>
                    </div>
                    <div className="item" tabIndex="0" aria-label={`Tutorials`}>
                        <img src={TutorialsIcon} alt="Tutorials" />
                        <span>Tutorials</span>
                    </div>
                    <div className="item" tabIndex="0" aria-label={`Courses`}>
                        <img src={CoursesIcon} alt="Courses" />
                        <span>Courses</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftBar;
