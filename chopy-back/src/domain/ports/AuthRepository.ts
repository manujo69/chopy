import { AuthSession, LoginCredentials, TokenPair } from '../entities/Auth.js';

export interface AuthRepository {
    login(credentials: LoginCredentials): Promise<AuthSession>;
    refresh(refreshToken: string, expiresInMins?: number): Promise<TokenPair>;
    getCurrentUser(accessToken: string): Promise<Omit<AuthSession, 'accessToken' | 'refreshToken'>>;
}
