import express from 'express';
import cookieParser from 'cookie-parser';
import postRoute from './route/post.route.js';
import authRoute from './route/auth.route.js';
import testRoute from './route/test.route.js';
import userRoute from './route/user.route.js';
import cors from "cors";

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(cookieParser());

// Handle preflight requests
app.options(process.env.CLIENT, cors());

app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.listen(6969, () => {
    console.log('Server is running on port 6969');
    console.log(process.env.CLIENT)
});
