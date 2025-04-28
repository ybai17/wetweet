const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();

// middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// test
app.get('/ping', (req, res) => {
    res.send('pong');
});

// JWT authentication middleware
function requireAuth(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - no token' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.userId };
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized - invalid token' });
    }
}

// controllers
const {
    getPosts,
    getPostById,
    createPost,
    deletePost
} = require('./controllers/postsController');
const { getComments, createComment } = require('./controllers/commentsController');
const { getLikes, createLike } = require('./controllers/likesController');
const {
    signup,
    signin,
    logout,
    getUserProfile,
    getCurrentUserProfile
} = require('./controllers/usersController');

// Post routes
app.get('/api/posts', getPosts);
app.get('/api/posts/:id', getPostById);
app.post('/api/posts', requireAuth, createPost);
app.delete('/api/posts/:id', requireAuth, deletePost);

// Comment route
app.get('/api/posts/:id/comments', getComments);
app.post('/api/posts/:id/comments', requireAuth, createComment);

// Like route
app.get('/api/posts/:id/likes', getLikes);
app.post('/api/posts/:id/like', requireAuth, createLike);


// User auth routes
app.post('/api/signup', signup);
app.post('/api/signin', signin);
app.post('/api/logout', requireAuth, logout);

// User profile routes
app.get('/api/users/me', requireAuth, getCurrentUserProfile);
app.get('/api/users/:id', requireAuth, getUserProfile);

//global error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// server start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
