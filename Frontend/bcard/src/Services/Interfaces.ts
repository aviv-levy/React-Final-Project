export interface User {
    userDetails?: User,
    _id?: string;
    firstname?: string;
    lastname?: string;
    middlename?: string;
    phone?: string;
    email: string;
    password?: string;
    img?: string,
    img_alt?: string,
    state?: string,
    country?: string,
    city?: string;
    street?: string,
    housenum?: number,
    zip?: number,
    biz?: boolean,
    token?: string;
    isAdmin?: boolean;
    likedCards?: Array<string>;
}

export interface Cards {
    _id?: string;
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web?: string;
    imageUrl?: string,
    imageAlt?: string,
    state?: string,
    country: string,
    city: string;
    street: string,
    houseNumber: number,
    zip?: number,
    userId: string;
}

export interface context {
    isLoggedIn: boolean,
    setIsLoggedIn: Function,
    userDetails?: User,
    setUserDetails: Function,
    filteredCards?: Array<Cards>,
    setFilteredCards: Function,
    darkMode?: boolean,
    setDarkMode: Function
}

export interface CopyCardsContext {
    copyCards?: Array<Cards>,
    setCopyCards: Function
}