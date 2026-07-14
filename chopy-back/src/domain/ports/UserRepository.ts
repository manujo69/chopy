import { User } from '../entities/User.js';
import { Paginated } from '../shared/Paginated.js';
import { ListParams } from '../shared/ListParams.js';

export interface UserRepository {
    findAll(params?: ListParams): Promise<Paginated<User>>;
    findById(id: number): Promise<User | null>;
    search(query: string, params?: ListParams): Promise<Paginated<User>>;
    create(data: Omit<User, 'id'>): Promise<User>;
    update(id: number, data: Partial<User>): Promise<User>;
    delete(id: number): Promise<User>;
}
