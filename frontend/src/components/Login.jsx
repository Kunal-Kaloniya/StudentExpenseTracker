import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

function Login() {
    const [username, setUsername] = useState("");
    const login = useAuthStore((state) => state.login);

    const handleLogin = () => {
        login(username);
    }

    return (
        <div className="fixed w-full h-screen flex items-center justify-center backdrop-blur-sm z-10">
            <div className="w-lg min-h-fit border-2 border-gray-200 bg-gray-100 p-8 rounded-xl">
                <h1 className="text-3xl font-bold text-center mb-4">Create a User Profile:</h1>
                <div>
                    <input
                        type="text"
                        name="username"
                        className="w-full border-2 outline-0 focus:border-blue-500 border-gray-200 px-4 py-2 rounded-lg"
                        placeholder="Enter the username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-4 cursor-pointer"
                        onClick={handleLogin}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;