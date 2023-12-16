import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from '../components/Home'
import Shop from '../components/Shop'
import Checkout from "../components/Checkout";

function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                { index: true, element: <Home /> },
                { path: "home", element: <Home /> },
                { path: "shop", element: <Shop /> },
                { path: "checkout", element: <Checkout /> },
            ]
        },
    ]);

    return <RouterProvider router={router} />
}

export default Router