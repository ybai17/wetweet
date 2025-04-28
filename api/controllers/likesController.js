const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const debug_mode = false;

//LIST LIKES
const getLikes = async (request, response) => {
    try {
        const likes = await prisma.post.findUnique({
            where: {
              id: parseInt(request.params.id),
            },
            select: {
              likes: true,
            },
          });
        
          response.status(200).json(likes);
    } catch (error) {
        console.error('Error fetching likes:', error);
        res.status(500).json({ error: 'Failed to fetch likes' });
    }
};

// create a new like
const createLike = async (req, res) => {
  if (debug_mode) {
    console.log("CREATE LIKE REQ:");
    console.log(req);

    console.log("--------------------------------------------------------RES");
    console.log(res);
  }

    try {
        const userId = req.user.id;
        const postId = req.body.id;

        const newLike = await prisma.like.create({
            data: {
                userId: userId,
                postId: postId,
            },
        });

        res.status(201).json(newLike);
    } catch (error) {
        console.error('Error adding like:', error);
        res.status(500).json({ error: 'Failed to add like', detail: error.message });
    }
};

module.exports = { getLikes, createLike };