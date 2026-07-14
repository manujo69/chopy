import { Product } from '../entities/Product.js';
import { Paginated } from '../shared/Paginated.js';
import { ListParams } from '../shared/ListParams.js';

export interface ProductRepository {
    findAll(params?: ListParams): Promise<Paginated<Product>>;
    findById(id: number): Promise<Product | null>;
    search(query: string, params?: ListParams): Promise<Paginated<Product>>;
    findByCategory(category: string, params?: ListParams): Promise<Paginated<Product>>;
    getCategories(): Promise<string[]>;
    create(data: Omit<Product, 'id'>): Promise<Product>;
    update(id: number, data: Partial<Product>): Promise<Product>;
    delete(id: number): Promise<Product>;
}
