const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')


export function isEmailValid(email: string): boolean {
    if (!validEmail.test(email))
        return true;

    return false;
}

export function isPasswordValid(password: string): boolean {
    if (!password || password.length < 8)
        return true;

    return false;
}