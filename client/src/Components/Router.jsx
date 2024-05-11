import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import Dashboard from "./Dashboard";
import About from "./About";
import Article from "./Article";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Users from "./Users";

export default function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/dashboard/articles/" replace />
        },
        {
            path: "/dashboard",
            element: <Dashboard />,
            children: [
                {
                    path: "about",
                    element: <About />,
                },
                {
                    path: "articles",
                    element: <Article />
                }
            ]
        },
        {
            path: "/users",
            element: <Users />,
            children: [
                {
                    path: "sign-up",
                    element: <SignUp />
                },
                {
                    path: "sign-in",
                    element: <SignIn />
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}