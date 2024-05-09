import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import App from "./App";

export default function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/articles" replace />
        },
        {
            path: "/articles",
            element: <App />
        }
    ]);

    return <RouterProvider router={router} />;
}