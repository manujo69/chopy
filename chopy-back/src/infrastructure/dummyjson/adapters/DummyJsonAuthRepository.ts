import { AuthSession, LoginCredentials, TokenPair } from '../../../domain/entities/Auth.js';
import { AuthRepository } from '../../../domain/ports/AuthRepository.js';
import { dummyJsonFetchJson } from '../http/dummyJsonClient.js';
import { LoginResponseDTO, MeResponseDTO, RefreshResponseDTO } from '../dto/AuthDTO.js';
import { toAuthSession, toAuthenticatedUser, toTokenPair } from '../mappers/AuthMapper.js';

export class DummyJsonAuthRepository implements AuthRepository {
    async login(credentials: LoginCredentials): Promise<AuthSession> {
        const dto = await dummyJsonFetchJson<LoginResponseDTO>('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        return toAuthSession(dto);
    }

    async refresh(refreshToken: string, expiresInMins?: number): Promise<TokenPair> {
        const dto = await dummyJsonFetchJson<RefreshResponseDTO>('/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken, expiresInMins }),
        });
        return toTokenPair(dto);
    }

    async getCurrentUser(accessToken: string): Promise<Omit<AuthSession, 'accessToken' | 'refreshToken'>> {
        const dto = await dummyJsonFetchJson<MeResponseDTO>('/auth/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return toAuthenticatedUser(dto);
    }
}
