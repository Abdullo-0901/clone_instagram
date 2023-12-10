import { lazy } from "react";
export const Layout = lazy(() => import("../layout/Layout"));
export const Create = lazy(() => import("../pages/create"));
export const Home = lazy(() => import("../pages/home"));
export const Interesting = lazy(() => import("../pages/interesting"));
export const Login = lazy(() => import("../pages/login.tsx"));
export const Messages = lazy(() => import("../pages/messages"));
export const More = lazy(() => import("../pages/more"));
export const Notifications = lazy(() => import("../pages/notifications"));
export const Profile = lazy(() => import("../pages/profile"));
export const Reels = lazy(() => import("../pages/reels"));
export const Register = lazy(() => import("../pages/register.tsx"));
export const SearchQuery = lazy(() => import("../pages/search-query"));
export const ForgotPassword = lazy(() => import("../pages/forgot-password"));
