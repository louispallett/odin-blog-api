/* 
========================
OUTSTANDING TASKS
========================

* Authorization * 

    UPDATE: We may want to look into how we check more generally if req.user exists - what we could do is add the isAuth state to 
    the router and then pass it down. It might make more sense than putting it everywhere!

* Edit Site *

    Create a seperate front end (a whole seperate front end is probably the easiest for this, so that we can have a different
    authorization token etc.) where users can create articles etc.

*/

import { useState, useEffect } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import Dashboard from "./Dashboard";
import About from "./About";
import Article from "./Article";
import Articles from "./Articles";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Users from "./Users";
import WriteForUs from "./WriteForUs";
import WriterDashboard from "./writers/WritersDashboard";
import DeleteArticle from "./writers/DeleteArticle";
import UpdateArticle from "./writers/UpdateArticle";
import NewArticle from "./writers/NewArticle";

export default function Router() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("Authorization");
            if (!token) {
                return;
            };
            try {
                const response = await fetch("/api/verify", { 
                    mode: "cors", 
                    headers: { "Authorization": `${token}`} 
                })
                if (response.status < 400) {
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                }
                // console.log(isAuth);
            } catch (err) {
                console.log(err)
            }
        }
        checkUser();
    });

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/dashboard/articles/" replace />
        },
        {
            path: "/dashboard",
            element: <Dashboard isAuth={isAuth}/>,
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
                },
                {
                    path: "writeforus",
                    element: <WriteForUs />
                }
            ]
        },
        {
            path: "/users",
            element: <Users />,
            children: [
                {
                    path: "sign-up",
                    element: isAuth ? <Navigate to="/dashboard/articles/" replace /> : <SignUp />
                },
                {
                    path: "sign-in",
                    element: isAuth ? <Navigate to="/dashboard/articles/" replace /> : <SignIn isAuth={setIsAuth}/>
                }
            ]
        },
        {
            path: "/writers",
            children: [
                // All we need to do here is set a 'writer' property in the model to true in MongoDB. We can
                // then collect the information and pass it down.
                {
                    path: "users",
                    element: <Users />,
                    children: [
                        {
                            path: "sign-in",
                            element: <SignIn writer={true} />
                        }
                    ]
                },
                {
                    path: "articles",
                    element: <WriterDashboard />,
                    children: [
                        {
                            path: "new",
                            element: <NewArticle />,
                        },
                        {
                            path: ":articleId/delete",
                            element: <DeleteArticle />
                        },
                        {
                            path: ":articleId/update",
                            element: <UpdateArticle />
                        }
                    ]
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}