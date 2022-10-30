import create from "zustand";
import { Category, Store } from "./Utils/tscTypes";
import { devtools } from "zustand/middleware";

const useUserStore = create<Store>((set) => ({
    token: "",
    isLogged: false,
    categoryDetail: { news: true, president: true, niti: true, idsa: true, pib: true, prs: true },

    loginUser: (jwtToken: string) => {
        set((state) => ({
            ...state,
            token: jwtToken,
            isLogged: true,
        }));
    },

    logoutUser: () => {
        set((state) => ({
            ...state,
            token: "",
            isLogged: false,
        }));
    },

    setCategoryDetail: (category: Category) => {
        set((state) => ({
            ...state,
            categoryDetail: category,
        }));
    },
}));

export default useUserStore;
