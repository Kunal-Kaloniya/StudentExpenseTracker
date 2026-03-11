import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            currentUser: null,
            userProfiles: [],

            login: (username) => {
                const { userProfiles } = get();

                if (!userProfiles.includes(username)) {
                    set({ userProfiles: [...userProfiles, username] });
                }

                set({ currentUser: username });
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