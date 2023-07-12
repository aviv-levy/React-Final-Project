import { Cards, User } from "./Interfaces";

//User Validation Inputs
export function validateUser(user?: User, errArray?: Array<string>) {
    if (user && errArray) {
        isTextValid(user.firstname) ? errArray[0] = 'First name must have 2 or more letters' : errArray[0] = ''
        if (user.middlename)
            isTextValid(user.middlename) ? errArray[1] = 'Middle name must have 2 or more letters' : errArray[1] = ''
        isTextValid(user.lastname) ? errArray[2] = 'Last name must have 2 or more letters' : errArray[2] = ''
        isPhoneValid(user.phone) ? errArray[3] = 'Phone is not valid' : errArray[3] = ''
        isEmailValid(user.email) ? errArray[4] = 'Email is not valid' : errArray[4] = ''
        isPasswordValid(user.password) ? errArray[5] = 'Password is not valid' : errArray[5] = ''
        if (user.img)
            isImageValid(user.img) ? errArray[6] = 'Image Url is not valid' : errArray[6] = ''
        if (user.img_alt)
            isTextValid(user.img_alt) ? errArray[7] = 'Image alt must have 2 or more letters' : errArray[7] = ''
        if (user.state)
            isTextValid(user.state) ? errArray[8] = 'State must have 2 or more letters' : errArray[8] = ''

        isTextValid(user.country) ? errArray[9] = 'Country is not valid' : errArray[9] = ''
        isTextValid(user.city) ? errArray[10] = 'City is not valid' : errArray[10] = ''
        isTextValid(user.street) ? errArray[11] = "Street is not valid" : errArray[11] = ''
        isHouseNumberValid(user.housenum) ? errArray[12] = "House Number must be above 0" : errArray[12] = ''
        if (user.zip)
            isZipValid(user.zip) ? errArray[13] = 'Zip must have 7 letters' : errArray[13] = ''
    }
}

//Card Validation Inputs
export function validateCard(card?: Cards, errArray?: Array<string>) {
    if (card && errArray) {
        isTextValid(card.title) ? errArray[0] = 'Title must have 2 or more letters' : errArray[0] = ''
        isTextValid(card.subtitle) ? errArray[1] = 'SubTitle must have 2 or more letters' : errArray[1] = ''
        isTextValid(card.description) ? errArray[2] = 'Description must have 2 or more letters' : errArray[2] = ''
        isPhoneValid(card.phone) ? errArray[3] = 'Phone is not valid' : errArray[3] = ''
        isEmailValid(card.email) ? errArray[4] = 'Email is not valid' : errArray[4] = ''
        if (card.web)
            isTextValid(card.web) ? errArray[5] = 'Web is not valid' : errArray[5] = ''
        if (card.imageUrl)
            isImageValid(card.imageUrl) ? errArray[6] = 'Image Url is not valid' : errArray[6] = ''
        if (card.imageAlt)
            isTextValid(card.imageAlt) ? errArray[7] = 'Image alt must have 2 or more letters' : errArray[7] = ''
        if (card.state)
            isTextValid(card.state) ? errArray[8] = 'State must have 2 or more letters' : errArray[8] = ''

        isTextValid(card.country) ? errArray[9] = 'Country is not valid' : errArray[9] = ''
        isTextValid(card.city) ? errArray[10] = 'City is not valid' : errArray[10] = ''
        isTextValid(card.street) ? errArray[11] = "Street is not valid" : errArray[11] = ''
        isHouseNumberValid(card.houseNumber) ? errArray[12] = "House Number must be above 0" : errArray[12] = ''
        if (card.zip)
            isZipValid(card.zip) ? errArray[13] = 'Zip must have 7 letters' : errArray[13] = ''
    }
}


const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
// eslint-disable-next-line
const validPhone = new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")
// eslint-disable-next-line
const validImageUrl = new RegExp("^https?:\/\/.+\.(?:png|jpe?g)$")
const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export function isEmailValid(email: string): boolean {
    if (!validEmail.test(email))
        return true;

    return false;
}

export function isPasswordValid(password: string): boolean {
    if (!validPassword.test(password))
        return true;

    return false;
}

export function isPhoneValid(phone: string): boolean {
    if (!validPhone.test(phone))
        return true;

    return false;
}

export function isTextValid(text: string): boolean {
    if (!text || text.length < 2)
        return true;

    return false;
}

export function isImageValid(url: string): boolean {
    if (!validImageUrl.test(url))
        return true;

    return false;
}
export function isHouseNumberValid(houseNum: number): boolean {
    if (!houseNum || houseNum < 1)
        return true;

    return false;
}

export function isZipValid(zip: number): boolean {
    if (zip.toString().length !== 7)
        return true;

    return false;
}