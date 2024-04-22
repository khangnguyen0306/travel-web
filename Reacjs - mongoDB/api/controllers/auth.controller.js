import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { fullname, email, password, phoneNumber, DOB, gender } = req.body;

    try {
        if (typeof password !== 'string') {
            return res.status(400).json({ message: "Password must be a string!" });
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const checkEmail = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
        const checkPhoneNumber = await prisma.user.findFirst({
            where: {
                phoneNumber: phoneNumber
            }
        });

        if (checkEmail) {
            return res.status(409).json({ message: "Email already exists!" });
        } else if (checkPhoneNumber) {
            return res.status(409).json({ message: "Phone number already exists!" });
        }

        await prisma.user.create({
            data: {
                fullname,
                email,
                phoneNumber,
                DOB,
                gender,
                password: hashPassword
            }
        });

        return res.status(200).json({ message: 'User created successfully!', status: 200 });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to create user!" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //check if user already exists
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!user) {
            res.status(404).json({ message: "user not found!" })
            return
        }
        //check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ message: "password is incorrect!" })
            return
        }
        // generate cookie token and return to user

        // res.setHeader('Set-Cookie', "test=" + "myvalue").json("success")
        const maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
        const token = jwt.sign(
            {
                id: user.id,
                isAdmin: true
            },

            process.env.JWT_SECRET_KEY, { expiresIn: maxAge }

        )
        const { password: userPassword, ...userData } = user
        res.cookie("token", + token, {
            httpOnly: true,
            maxAge: maxAge
        }).status(200).json({ message: "login successful!", userData: userData, token: token });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "fail to login !" })
    }

}


export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "logout successful!" });
}