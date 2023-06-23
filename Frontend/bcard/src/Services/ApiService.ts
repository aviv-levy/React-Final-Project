import axios from "axios";
import { Cards, User } from "./Interfaces";
import { getToken } from "../auth/TokenManager";



const serverUrl = 'http://localhost:4500/';


// Return true if user is logged in.
export function isLoggedIn(): boolean {
    const token = getToken();
    if (!token)
        return false;

    //Need endpoint that checks if the token is not expired

    return true;
}

// User Login
export async function login(user: User): Promise<User> {
    try {
        const result = await axios.post<User>(serverUrl + 'login', user, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return result.data;

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}

// User Register
export async function addNewUser(user: User): Promise<User> {
    try {
        const result = await axios.post<User>(serverUrl + 'admin/register', user, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        })
        return result.data;

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}

// Get user details from token
export async function getUserDetails(): Promise<User> {
    try {
        const result = await axios.get<User>(serverUrl + 'userDetails', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        })

        return result.data;

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}

// Get All cards
export async function getAllCards(): Promise<Array<Cards>> {
    try {
        const result = await axios.get<Array<Cards>>(serverUrl + `cards/getAllCards`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return result.data;

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}
// Get user cards
export async function getMyCards(): Promise<Array<Cards>> {
    try {
        const result = await axios.get<Array<Cards>>(serverUrl + `cards/getMyCards`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        })

        return result.data;

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}
// Get user card by Id
export async function getCardById(cardId?: string): Promise<Cards> {
    try {
        const result = await axios.get<Cards>(serverUrl + `cards/getCard/${cardId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        })

        return result.data;

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}

// Get user favorite cards
export async function getFavoriteCards(): Promise<Array<Cards>> {
    try {
        const result = await axios.get<Array<Cards>>(serverUrl + `cards/getFav`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        })

        return result.data;

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}


// Add new card
export async function addNewCard(card?: Cards): Promise<Cards> {
    try {
        const result = await axios.post<Cards>(serverUrl + 'cards/addNewCard', card, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        })
        return result.data;

    } catch (error: any) {
        console.log(error);

        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}


// Get user card by Id
export async function likeCard(cardId?: string): Promise<User> {
    try {
        const result = await axios.put<User>(serverUrl + `userDetails/likeCard/${cardId}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
        })

        return result.data;

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}
// Get user card by Id
export async function updateCard(card?: Cards): Promise<string> {
    try {
        const result = await axios.put<string>(serverUrl + `cards/updateCard`, card, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
        })

        return result.data;

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}