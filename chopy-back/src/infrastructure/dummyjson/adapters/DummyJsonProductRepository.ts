import { Product } from '../../../domain/entities/Product.js';
import { ProductRepository } from '../../../domain/ports/ProductRepository.js';
import { ListParams } from '../../../domain/shared/ListParams.js';
import { Paginated } from '../../../domain/shared/Paginated.js';
import { dummyJsonFetchJson, dummyJsonFetchJsonOrNull, toQueryString } from '../http/dummyJsonClient.js';
import { ProductDTO, ProductListResponseDTO } from '../dto/ProductDTO.js';
import { toProduct } from '../mappers/ProductMapper.js';
import { toPaginated } from '../mappers/toPaginated.js';

export class DummyJsonProductRepository implements ProductRepository {
    async findAll(params: ListParams = {}): Promise<Paginated<Product>> {
        const dto = await dummyJsonFetchJson<ProductListResponseDTO>(`/products${toQueryString({ ...params })}`);
        return toPaginated(dto.products, dto, toProduct);
    }

    async findById(id: number): Promise<Product | null> {
        const dto = await dummyJsonFetchJsonOrNull<ProductDTO>(`/products/${id}`);
        return dto ? toProduct(dto) : null;
    }

    async search(query: string, params: ListParams = {}): Promise<Paginated<Product>> {
        const dto = await dummyJsonFetchJson<ProductListResponseDTO>(
            `/products/search${toQueryString({ q: query, ...params })}`,
        );
        return toPaginated(dto.products, dto, toProduct);
    }

    async findByCategory(category: string, params: ListParams = {}): Promise<Paginated<Product>> {
        const dto = await dummyJsonFetchJson<ProductListResponseDTO>(
            `/products/category/${encodeURIComponent(category)}${toQueryString({ ...params })}`,
        );
        return toPaginated(dto.products, dto, toProduct);
    }

    async getCategories(): Promise<string[]> {
        return dummyJsonFetchJson<string[]>('/products/category-list');
    }

    async create(data: Omit<Product, 'id'>): Promise<Product> {
        const dto = await dummyJsonFetchJson<ProductDTO>('/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return toProduct(dto);
    }

    async update(id: number, data: Partial<Product>): Promise<Product> {
        const dto = await dummyJsonFetchJson<ProductDTO>(`/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return toProduct(dto);
    }

    async delete(id: number): Promise<Product> {
        const dto = await dummyJsonFetchJson<ProductDTO>(`/products/${id}`, { method: 'DELETE' });
        return toProduct(dto);
    }
}
