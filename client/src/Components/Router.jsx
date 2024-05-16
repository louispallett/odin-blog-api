/* 
========================
OUTSTANDING TASKS
========================

* Authorization * 

    We've got to CHECK for authorization on the front end, checking whether the "authorzation" token is there and if it
    is valid, then we can display different things to the user.

* Edit Site *

    Create a seperate front end (a whole seperate front end is probably the easiest for this, so that we can have a different
    authorization token etc.) where users can create articles etc.

*/

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import Dashboard from "./Dashboard";
import About from "./About";
import Article from "./Article";
import Articles from "./Articles";
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
                    element: <Articles />,
                },
                {
                    path: "articles/:id",
                    element: <Article />,
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