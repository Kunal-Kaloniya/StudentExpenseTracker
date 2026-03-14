import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import NavBar from "./NavBar.jsx";
import Login from "./Login.jsx";

function Layout() {
    const currentUser = useAuthStore((state) => state.currentUser);

    return (
        <div className="min-h-screen flex bg-gray-50 font-sans text-gray-800">
            {!currentUser && <Login />}

            <NavBar />
            <Outlet />
        </div>
    );
}

export default Layout;