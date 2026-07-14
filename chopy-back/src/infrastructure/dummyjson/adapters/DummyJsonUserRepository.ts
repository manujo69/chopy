import { User } from '../../../domain/entities/User.js';
import { UserRepository } from '../../../domain/ports/UserRepository.js';
import { ListParams } from '../../../domain/shared/ListParams.js';
import { Paginated } from '../../../domain/shared/Paginated.js';
import { dummyJsonFetchJson, dummyJsonFetchJsonOrNull, toQueryString } from '../http/dummyJsonClient.js';
import { UserDTO, UserListResponseDTO } from '../dto/UserDTO.js';
import { toUser } from '../mappers/UserMapper.js';
import { toPaginated } from '../mappers/toPaginated.js';

export class DummyJsonUserRepository implements UserRepository {
    async findAll(params: ListParams = {}): Promise<Paginated<User>> {
        const dto = await dummyJsonFetchJson<UserListResponseDTO>(`/users${toQueryString({ ...params })}`);
        return toPaginated(dto.users, dto, toUser);
    }

    async findById(id: number): Promise<User | null> {
        const dto = await dummyJsonFetchJsonOrNull<UserDTO>(`/users/${id}`);
        return dto ? toUser(dto) : null;
    }

    async search(query: string, params: ListParams = {}): Promise<Paginated<User>> {
        const dto = await dummyJsonFetchJson<UserListResponseDTO>(
            `/users/search${toQueryString({ q: query, ...params })}`,
        );
        return toPaginated(dto.users, dto, toUser);
    }

    async create(data: Omit<User, 'id'>): Promise<User> {
        const dto = await dummyJsonFetchJson<UserDTO>('/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return toUser(dto);
    }

    async update(id: number, data: Partial<User>): Promise<User> {
        const dto = await dummyJsonFetchJson<UserDTO>(`/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return toUser(dto);
    }

    async delete(id: number): Promise<User> {
        const dto = await dummyJsonFetchJson<UserDTO>(`/users/${id}`, { method: 'DELETE' });
        return toUser(dto);
    }
}
