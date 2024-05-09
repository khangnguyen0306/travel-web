import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany()
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mesage: "Failed to get posts!" })
    }
}
export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            },
            include: {
                postDetail: true,
                user: {
                    select: {
                        fullname: true,
                        avatar: true,
                    }
                }
            }
        })
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mesage: "Failed to get post!" })
    }
}
export const addPosts = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;
    try {
        const newPosts = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                postDetail: {
                    create: body.postDetail,
                }
            }
        })
        res.status(200).json({ newPosts, status: 201, message: "Createe successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mesage: "Failed to add posts!" })
    }
}
export const updatePosts = (req, res) => {
    try {
        res.status(200).json();
    } catch (error) {
        console.log(error);
        res.status(500).json({ mesage: "Failed to update posts!" })
    }
}
export const deletePosts = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    try {
        const post = await prisma.post.findUnique({
            where: { id }
        })
        if (post.userId !== tokenUserId) {
            return res.status(403).json({ message: "you are not authorized!" })
        }
        await prisma.post.delete({
            where: {
                id
            }
        })
        res.status(200).json("Post deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({ mesage: "Failed to delete posts!" })
    }
}