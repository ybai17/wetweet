const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const debug_mode = false;

// get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: { author: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts', detail: error.message });
    }
};

// get single post by id
const getPostById = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: { author: true }
        });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        console.error('Error fetching post by id:', err);
        res.status(500).json({ error: 'Failed to fetch post', detail: err.message });
    }
};

// create a new post
const createPost = async (req, res) => {
    if (debug_mode) {
        console.log("CREATE POST REQ:");
        console.log(req);
      }

    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ error: 'Content is required' });
        }

        const userId = req.user.id;

        const newPost = await prisma.post.create({
            data: {
                content,
                authorId: userId,
            },
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post', detail: error.message });
    }
};

// delete posts（Author only）
const deletePost = async (req, res) => {
    try {
        const postId = parseInt(req.params.id, 10);
        const userId = req.user.id;

        // Find this user's own posts
        const post = await prisma.post.findFirst({
            where: {
                id: postId,
                authorId: userId,
            },
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found or not authorized' });
        }

        await prisma.post.delete({ where: { id: postId } });
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Failed to delete post', detail: error.message });
    }
};

module.exports = {
    getPosts,
    getPostById,
    createPost,
    deletePost,
};
