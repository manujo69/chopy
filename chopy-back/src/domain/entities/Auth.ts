export interface LoginCredentials {
    username: string;
    password: string;
    expiresInMins?: number;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export interface AuthSession extends TokenPair {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}
