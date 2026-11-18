import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import ManagerDashboard from "./pages/ManagerDashboard/ManagarDashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/manager/dashboard",
        element: <ManagerDashboard />
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;