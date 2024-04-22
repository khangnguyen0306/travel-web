import jwt from 'jsonwebtoken'
export const shouldBeLoggedIn = async (req, res) => {
    console.log(req.userId)
    res.status(200).json({ message: "You Are aldready logged in" })


}
export const shouldBeAdmin = async (req, res) => {
    const token = req.cookies.token

    if (!token) return res.status(401).json({ message: "Not Authenticated" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) return res.status(403).json({ message: "Token is not valid" });
        if (!payload.isAdmin) {
            res.status(403).json({ message: "you are not allowed to access this page" });
        }
    });
    res.status(200).json({ message: "You are authenticated" });

}   