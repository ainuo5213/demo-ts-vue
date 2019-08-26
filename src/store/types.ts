export const SET_USER = 'SET_USER';

export interface User {
    "id": string,
    "username": string,
    "avatar": string,
    "key": string,
    "iat": number,
    "exp": number
}
