export interface LoginRequestDTO {
    username: string;
    password: string;
    expiresInMins?: number;
}

export interface LoginResponseDTO {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken: string;
    refreshToken: string;
}

export interface RefreshRequestDTO {
    refreshToken?: string;
    expiresInMins?: number;
}

export interface RefreshResponseDTO {
    accessToken: string;
    refreshToken: string;
}

export interface MeResponseDTO {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}
