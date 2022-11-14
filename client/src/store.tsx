import create from "zustand";
import { Category, Store } from "./Utils/tscTypes";
import axios from "axios";
import { devtools } from "zustand/middleware";

const useUserStore = create<Store>((set) => ({
    token: "",
    isLogged: false,
    subscriptionStatus: false,
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

    setSubscriptionStatus: async () => {
        try {
            const response = await axios.get("/subscriptionStatus");
            set((state) => ({
                ...state,
                subscriptionStatus: response.data.subscriptionStatus,
            }));
        } catch (err) {
            console.log(err);
            set((state) => ({
                ...state,
                subscriptionStatus: false,
            }));
        }
    },
}));

export default useUserStore;
