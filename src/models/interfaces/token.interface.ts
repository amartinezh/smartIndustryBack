export interface Token {
    id: number;
    name: string;
    rol: string;
    password: string;
    img?: string;
    access_token?: string,
    expires_in?: number
}