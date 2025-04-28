const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const debug_mode = false;

//LIST COMMENTS
const getComments = async (request, response) => {
    try {
        const comments = await prisma.post.findUnique({
            where: {
              id: parseInt(request.params.id),
            },
            select: {
              comments: true,
            },
          });
        
          response.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};

// create a new comment
const createComment = async (req, res) => {

  if (debug_mode) {
    console.log("CREATE COMMENT REQ:");
    console.log(req);

    console.log("------------------------------------------------------RES:");
    console.log(res);
  }

    try {
        const { content, postId } = req.body;
        if (!content) {
            return res.status(400).json({ error: 'Content is required' });
        }

        const userId = req.user.id;

        const newComment = await prisma.comment.create({
            data: {
                content,
                userId: userId,
                postId: postId,
            },
        });

        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Failed to create comment', detail: error.message });
    }
};

module.exports = { getComments, createComment };