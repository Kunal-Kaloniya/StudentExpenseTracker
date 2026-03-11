import { Link } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useAuthStore } from "../context/useAuthStore";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";

function NewProfileForm({ onClose }) {
    const login = useAuthStore((state) => state.login);

    const [profileName, setProfileName] = useState("");

    const handleCreateNewProfile = () => {
        if (profileName.trim()) {
            login(profileName);
            onClose();
        }
    }

    return (
        <div className="absolute -right-[110%] w-2xs min-h-fit border-2 border-gray-200 bg-white p-2 rounded-xl">
            <div>
                <input
                    type="text"
                    name="profileName"
                    className="w-full border-2 outline-0 focus:border-blue-500 border-gray-200 px-4 py-2 rounded-lg"
                    placeholder="Enter the username"
                    onChange={(e) => setProfileName(e.target.value)}
                    required
                />
                <div className="flex gap-1">
                    <button
                        className="flex-1 w-full bg-gray-200 hover:bg-gray-300 font-medium py-2.5 rounded-lg transition-colors mt-4 cursor-pointer"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-4 cursor-pointer"
                        onClick={handleCreateNewProfile}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

function NavBar() {
    const { currentUser, userProfiles, login } = useAuthStore(
        useShallow((state) => ({
            currentUser: state.currentUser,
            userProfiles: state.userProfiles,
            login: state.login
        }))
    );

    const [activeMenu, setActiveMenu] = useState(null);
    const pageLinks = [
        { id: 1, name: "HOME", to: '/' },
        { id: 2, name: "BUDGET", to: '/budget' },
        { id: 3, name: "HISTORY", to: '/history' },
        { id: 4, name: "SETTINGS", to: '/settings' }
    ];

    const handleAddNewProfile = () => { setActiveMenu("form"); }

    return (
        <div className="sticky top-0 left-0 h-screen mr-5 bg-white rounded-r-2xl shadow-sm border border-gray-100 w-2xs">
            <div className="w-full h-full flex flex-col">
                <section className="flex-2 flex items-center justify-center p-4">
                    {/* <h1 className="font-bold text-xl">Student Expense Tracker</h1> */}
                </section>

                <section className="border-t border-gray-200 flex-5 px-2 py-6">
                    <ul className="flex flex-col gap-2">
                        {pageLinks.map((item) => (
                            <li key={item.id}>
                                <Link
                                    to={item.to}
                                    className="flex items-center px-6 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 border-2 border-gray-100 hover:border-gray-200 transition-colors duration-200"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="relative border-t border-gray-200 flex items-center justify-center flex-1 p-4">
                    <div
                        className="flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-gray-100 hover:border-2 border-gray-200 hover:cursor-pointer transition-colors duration-200"
                        onClick={() => setActiveMenu("list")}
                    >
                        <div className="w-fit rounded-full">
                            <IoPersonCircleOutline size="50" />
                        </div>
                        <div>
                            <h3>{currentUser}</h3>
                            <h6 className="text-xs text-gray-500">Click to change profile</h6>
                        </div>
                    </div>

                    {activeMenu === "list" && (
                        <div
                            className="absolute bottom-full w-2xs min-h-fit flex items-center gap-5 px-2 py-3 bg-white border-2 border-gray-200"
                            onMouseLeave={() => setActiveMenu(null)}
                        >
                            {userProfiles.length === 0 ? (
                                <p>No user profiles...</p>
                            ) : (
                                <ul className="w-full h-full space-y-1">
                                    {userProfiles.map((profile, idx) => (
                                        <li
                                            key={idx}
                                            className="bg-gray-50 hover:bg-gray-200 rounded-lg px-3 py-1 cursor-pointer flex justify-between items-center transition-colors duration-200"
                                            onClick={() => login(profile)}
                                        >
                                            {profile}
                                            {profile === currentUser && <span className="bg-green-400 border border-green-400 rounded-full p-1"></span>}
                                        </li>
                                    ))}
                                    <li
                                        className="bg-gray-50 hover:bg-gray-200 rounded-lg px-3 py-1 cursor-pointer flex justify-between items-center transition-colors duration-200"
                                        onClick={handleAddNewProfile}
                                    >
                                        Add new profile
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}
                    {activeMenu === "form" && <NewProfileForm onClose={() => setActiveMenu(null)} />}
                </section>
            </div>
        </div>
    );
}

export default NavBar;