import { createBrowserRouter, useParams } from "react-router-dom";
import Loadable from "./Loadable";
import MainLayout from "../layout/MainLayout";
import AuthGuard from "./AuthGuard";

const Login = Loadable({ loader: () => import("../pages/login/Login") });
const userRegister = Loadable({ loader: () => import("../pages/login/register") });
const Home = Loadable({ loader: () => import("../pages/home/Home") });
const Profile = Loadable({ loader: () => import("../pages/userManagement/userProfile/profille") });
const CreatePosts = Loadable({ loader: () => import("../pages/Post/component/createPost") });
const PostDetail = Loadable({ loader: () => import("../pages/Post/component/PostDetails") });

const Dashboard = Loadable({
  loader: () => import("../pages/dashboard/Dashboard"),
});
const Admin = Loadable({
  loader: () => import("../pages/admin/Admin"),
});
export const router = createBrowserRouter([
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/register",
    element: userRegister,
  },
  {
    path: "/",
    element: <AuthGuard />,

    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: Dashboard,
          },
          {
            path: "home",
            element: Home,
          },
          {
            path: "admin",
            element: Admin,
          },
          {
            path: `profile/:userId`,
            element: Profile,
          },
          {
            path: `createPosts`,
            element:CreatePosts ,
          },
          {
            path: `postDetails/:postId`,
            element: PostDetail,
          },
         
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div>ERROR</div>,
  },
]);
