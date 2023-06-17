import axios from "axios";
import { User } from "./Interfaces";
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
