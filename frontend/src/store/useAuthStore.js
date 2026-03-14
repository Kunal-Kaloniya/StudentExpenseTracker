import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { loginUser } from "../helper/api.js";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            currentUser: null,
            userProfiles: [],

            login: async (username) => {
                try {
                    const { userProfiles } = get();

                    const response = await loginUser(username);

                    if (!userProfiles.includes(username)) {
                        set({ userProfiles: [...userProfiles, response.data.username] });
                    }

                    set({ currentUser: response.data.username });
                } catch (err) {
                    console.error("Login Error:", err.response?.data?.message || err.message);
                }
            },

            logout: () => set({ currentUser: null }),

            deleteProfile: (username) => set((state) => ({
                userProfiles: state.userProfiles.filter(p => p !== username),
                currentUser: state.currentUser === username ? null : state.currentUser,
            }))
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);