import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import GlobalSpinner from "../components/shared/GlobalSpinner/GlobalSpinner";
const Layout = lazy(() => import("../components/layout/Layout"));
const Posts = lazy(() => import("../pages/Posts/posts"));
const Login = lazy(() => import("../pages/Login/login"));
const Register = lazy(() => import("../pages/Register/register"));
const NotFound = lazy(() => import("../pages/Notfound/notFound"));
const ProtectedRoutes = lazy(() => import("./ProtectedRoutes"));
const ProtectedAuthRoutes = lazy(() => import("./ProtectedAuthRoutes"));
const PostDetails = lazy(() => import("../pages/PostDetails/postDetails"));
const Profile = lazy(() => import("../pages/Profile/profile"));
// import Layout from "../components/layout/Layout";
// import Posts from "../pages/Posts/posts";
// import Login from "../pages/Login/login";
// import Register from "../pages/Register/register";
// import NotFound from "../pages/Notfound/notFound";
// import ProtectedRoutes from "./ProtectedRoutes";
// import ProtectedAuthRoutes from "./ProtectedAuthRoutes";
// import PostDetails from "../pages/PostDetails/postDetails";
// import Profile from "../pages/Profile/profile";

export const router = createBrowserRouter([
  {
    errorElement: (
      <Suspense fallback={<GlobalSpinner />}>
        <NotFound />
      </Suspense>
    ),
    path: "/",
    element: (
      <Suspense fallback={<GlobalSpinner />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<GlobalSpinner />}>
              <Posts />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/posts",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<GlobalSpinner />}>
              <Posts />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<GlobalSpinner />}>
              <Profile />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/posts/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<GlobalSpinner />}>
              <PostDetails />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedAuthRoutes>
            <Suspense fallback={<GlobalSpinner />}>
              <Login />
            </Suspense>
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedAuthRoutes>
            <Suspense fallback={<GlobalSpinner />}>
              <Register />
            </Suspense>
          </ProtectedAuthRoutes>
        ),
      },
    ],
  },
]);
