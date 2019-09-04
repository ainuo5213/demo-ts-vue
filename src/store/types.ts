export const SET_USER: string = 'SET_USER';

export interface User {
    "id": string,
    "username": string,
    "avatar": string,
    "key": string,
    "iat": number,
    "exp": number
}

export interface FormData {
    title: string,
    type: string,
    level: string,
    count: string,
    date: string,
    _id?: string,
    _v?: number
}

export const SET_ROUTERS: string = 'SET_ROUTERS';
