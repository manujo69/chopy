import { Cart } from '../entities/Cart.js';
import { Paginated } from '../shared/Paginated.js';
import { ListParams } from '../shared/ListParams.js';

export interface CartRepository {
    findAll(params?: ListParams): Promise<Paginated<Cart>>;
    findById(id: number): Promise<Cart | null>;
    findByUserId(userId: number, params?: ListParams): Promise<Paginated<Cart>>;
    create(data: Omit<Cart, 'id'>): Promise<Cart>;
    update(id: number, data: Partial<Cart>): Promise<Cart>;
    delete(id: number): Promise<Cart>;
}
