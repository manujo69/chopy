import { Cart } from '../../../domain/entities/Cart.js';
import { CartRepository } from '../../../domain/ports/CartRepository.js';
import { ListParams } from '../../../domain/shared/ListParams.js';
import { Paginated } from '../../../domain/shared/Paginated.js';
import { dummyJsonFetchJson, dummyJsonFetchJsonOrNull, toQueryString } from '../http/dummyJsonClient.js';
import { CartDTO, CartListResponseDTO } from '../dto/CartDTO.js';
import { toCart } from '../mappers/CartMapper.js';
import { toPaginated } from '../mappers/toPaginated.js';

export class DummyJsonCartRepository implements CartRepository {
    async findAll(params: ListParams = {}): Promise<Paginated<Cart>> {
        const dto = await dummyJsonFetchJson<CartListResponseDTO>(`/carts${toQueryString({ ...params })}`);
        return toPaginated(dto.carts, dto, toCart);
    }

    async findById(id: number): Promise<Cart | null> {
        const dto = await dummyJsonFetchJsonOrNull<CartDTO>(`/carts/${id}`);
        return dto ? toCart(dto) : null;
    }

    async findByUserId(userId: number, params: ListParams = {}): Promise<Paginated<Cart>> {
        const dto = await dummyJsonFetchJson<CartListResponseDTO>(
            `/carts/user/${userId}${toQueryString({ ...params })}`,
        );
        return toPaginated(dto.carts, dto, toCart);
    }

    async create(data: Omit<Cart, 'id'>): Promise<Cart> {
        const dto = await dummyJsonFetchJson<CartDTO>('/carts/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return toCart(dto);
    }

    async update(id: number, data: Partial<Cart>): Promise<Cart> {
        const dto = await dummyJsonFetchJson<CartDTO>(`/carts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return toCart(dto);
    }

    async delete(id: number): Promise<Cart> {
        const dto = await dummyJsonFetchJson<CartDTO>(`/carts/${id}`, { method: 'DELETE' });
        return toCart(dto);
    }
}
