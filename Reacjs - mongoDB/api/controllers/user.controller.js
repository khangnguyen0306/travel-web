import prisma from "../lib/prisma.js";
import bcrypt from 'bcrypt'
export const getUsers = async (req, res) => {
    try {
        const allUser = await prisma.user.findMany({
            select: {
                id: true,
                fullname: true,
                email: true,
                phoneNumber: true,
                DOB: true,
                gender: true,
                avatar: true,
                createdAt: true
            }
        });
        res.status(200).json(allUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "fail to get users!" })
    }
}
export const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const tokenUserId = req.userId;
        if (id !== tokenUserId) {
            res.status(403).json({ message: "you are not authorized!" })
        };
        const User = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                fullname: true,
                email: true,
                phoneNumber: true,
                DOB: true,
                gender: true,
                avatar: true,
                createdAt: true
            }
        });
        res.status(200).json(User);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "fail to get users!" })
    }
}
export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const tokenUserId = req.userId;     //check xem id di qua middle ware co trung voi id duoc lay tren FE khong check xem co phai user nay dang thuc hien chinh sua hay 1 user khac
        const { password, avatar, ...inputs } = req.body;

        if (id !== tokenUserId) {
            res.status(403).json({ message: "you are not authorized!" })
        };
        let updatePassword = null;
        if (password) {
            updatePassword = await bcrypt.hash(password, 10);
        };
        const User = await prisma.user.update({
            where: { id },
            data: {
                ...inputs,
                ...(updatePassword && { password: updatePassword }),                 //check if not null thi update
                ...(avatar && { avatar: avatar })
            }
        })

        res.status(200).json({ message: "updated successfully!", status: 200 });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "fail to update users!" })
    }
}
export const deleteUser = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "fail to update users!" })
    }
}