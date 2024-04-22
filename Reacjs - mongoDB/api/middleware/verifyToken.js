import jwt from 'jsonwebtoken';

export  const verifyToken = (req, res, next) => {
    const tokenFromCookie = req.cookies.token;

    // Trích xuất token từ header Authorization
    const tokenFromHeader = req.headers.authorization;

    // Kiểm tra xem token có tồn tại trong cookie hoặc header không
    const token = tokenFromCookie || tokenFromHeader;

    if (!token) return res.status(401).json({ message: "Not Authenticated" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) return res.status(403).json({ message: "Token is not valid" });
        req.userId = payload.id;
        next();
    })

}