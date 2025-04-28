import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthUser } from '../security/AuthContext';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import "./Navbar.css";

const Navbar = () => {
    const { user, logout } = useAuthUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/signin');
    };

    return (
        <AppBar position="sticky" className="navbar-appbar">
            <Toolbar className="navbar-toolbar">
                <Box className="navbar-left">
                    <Link to="/">
                        <img
                            src="/Weiter.png"
                            alt="Logo"
                            className="navbar-logo"
                            aria-label="home"
                        />
                    </Link>

                    <Tooltip title="Home" arrow>
                        <IconButton
                            component={Link}
                            to="/"
                            className="navbar-icon-button"
                            aria-label="home"
                        >
                            <HomeOutlinedIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="New Post" arrow>
                        <IconButton
                            component={Link}
                            to="/newpost"
                            className="navbar-icon-button"
                            aria-label="new-post"
                        >
                            <PostAddOutlinedIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Post List" arrow>
                        <IconButton
                            component={Link}
                            to="/itemlist"
                            className="navbar-icon-button"
                            aria-label="post-list"
                        >
                            <FormatListBulletedIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                <Box className="navbar-right">
                    <Typography className="navbar-username">
                        {user.username}
                    </Typography>

                    <Tooltip title="My Profile" arrow>
                        <IconButton
                            component={Link}
                            to="/myprofile"
                            className="navbar-icon-button"
                            aria-label="profile"
                        >
                            <PersonOutlinedIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Logout" arrow>
                        <IconButton
                            onClick={handleLogout}
                            className="navbar-icon-button"
                            aria-label="logout"
                        >
                            <LogoutOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
