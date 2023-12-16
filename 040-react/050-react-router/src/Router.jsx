import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import DefaultProfile from './DefaultProfile.jsx';
import Profile from './Profile.jsx'
import Spinach from "./Spinach.jsx";
import Popeye from "./Popeye.jsx";

function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
        },
        {
            path: "profile",
            // can also use dynamic routes, ie "profile/:name,
            // instead of hardcoding children"
            element: <Profile />,
            children: [
                { index: true, element: <DefaultProfile /> },
                { path: "spinach", element: <Spinach /> },
                { path: "popeye", element: <Popeye /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router