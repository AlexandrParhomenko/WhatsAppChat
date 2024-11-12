import { createHashRouter, Navigate } from "react-router-dom";
import routes from "./routes";
import BaseLayout from "../pages/BaseLayout/BaseLayout.tsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.tsx";
import AuthPage from "../pages/AuthPage/AuthPage.tsx";
import ChatPage from "../pages/ChatPage/ChatPage.tsx";

export const routesConfig = [
    {
        element: <AuthPage />,
        index: true
    },
    {
        element: <AuthPage />,
        path: "/login"
    },
    {
        element: <BaseLayout />,
        path: "/",
        children: [
            {
                path: routes.main,
                element: <ChatPage />
            },
            {
                path: "*",
                element: <Navigate to={routes.notFound} />
            },
            {
                path: routes.notFound,
                element: <NotFoundPage />
            }
        ]
    }
];

const router = createHashRouter(routesConfig);

export default router;