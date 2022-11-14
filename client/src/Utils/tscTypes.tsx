export type BookmarkData = {
    id: string;
    date: number;
    title: string;
    url: string;
    category: string;
};

export type Category = {
    news: boolean;
    president: boolean;
    niti: boolean;
    idsa: boolean;
    pib: boolean;
    prs: boolean;
};

export type OffCanvasProps = {
    showFollowSite: boolean;
    category: Category;
    showHandler: () => void;
};

export type ModalProps = {
    removeHandler: () => void;
    show: boolean;
    category: Category;
};

export type ChecklistProps = {
    show: boolean;
    category: Category;
    removeModal: () => void;
};

export type BackdropProps = {
    remove: () => void;
};

export type DateProps = {
    children: string;
};

export type SidebarProps = {
    category: Category;
};

export type CategorySideBarProps = {
    categoryNew: Category;
};

export type Post = {
    id: string;
    title: string;
    url: string;
    category: string;
    source: string;
    createdAt: number;
    updatedAt: number;
};

export type Store = {
    token: string;
    isLogged: boolean;
    subscriptionStatus: boolean;
    categoryDetail: Category;
    loginUser: (jwtToken: string) => void;
    logoutUser: () => void;
    setCategoryDetail: (category: Category) => void;
    setSubscriptionStatus: () => Promise<void>;
};

export type SuccessDisplayProps = {
    sessionId: string;
};

export type MessageProps = {
    message: string;
};
