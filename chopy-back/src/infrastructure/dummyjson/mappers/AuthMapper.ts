import { AuthSession, TokenPair } from '../../../domain/entities/Auth.js';
import { LoginResponseDTO, MeResponseDTO, RefreshResponseDTO } from '../dto/AuthDTO.js';

export function toAuthSession(dto: LoginResponseDTO): AuthSession {
    return {
        id: dto.id,
        username: dto.username,
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        gender: dto.gender,
        image: dto.image,
        accessToken: dto.accessToken,
        refreshToken: dto.refreshToken,
    };
}

export function toTokenPair(dto: RefreshResponseDTO): TokenPair {
    return { accessToken: dto.accessToken, refreshToken: dto.refreshToken };
}

export function toAuthenticatedUser(dto: MeResponseDTO): Omit<AuthSession, 'accessToken' | 'refreshToken'> {
    return {
        id: dto.id,
        username: dto.username,
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        gender: dto.gender,
        image: dto.image,
    };
}
