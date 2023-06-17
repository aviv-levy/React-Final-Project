export interface User {
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
}

export interface context {
    isLoggedIn: boolean,
    setIsLoggedIn: Function,
  }