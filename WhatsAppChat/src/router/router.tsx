import { createHashRouter, Navigate } from "react-router-dom";
import routes from "./routes";
import BaseLayout from "../pages/BaseLayout/BaseLayout.tsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.tsx";
import AuthPage from "../pages/AuthPage/AuthPage.tsx";
import ChatPage from "../pages/ChatPage/ChatPage.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

export const routesConfig = [
    {
        element: <BaseLayout />,
        path: routes.main,
        children: [
            {
                index: true,
                element: <AuthPage />
            },
            {
                path: routes.chat,
                element: <ProtectedRoute><ChatPage /></ProtectedRoute>
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