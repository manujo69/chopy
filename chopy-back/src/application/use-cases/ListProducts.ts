import { Product } from '../../domain/entities/Product.js';
import { ProductRepository } from '../../domain/ports/ProductRepository.js';
import { ListParams } from '../../domain/shared/ListParams.js';
import { Paginated } from '../../domain/shared/Paginated.js';

export interface ListProductsParams extends ListParams {
    q?: string;
    category?: string;
}

export class ListProducts {
    constructor(private readonly productRepository: ProductRepository) {}

    execute(params: ListProductsParams = {}): Promise<Paginated<Product>> {
        const { q, category, ...listParams } = params;

        if (q) {
            return this.productRepository.search(q, listParams);
        }

        if (category) {
            return this.productRepository.findByCategory(category, listParams);
        }

        return this.productRepository.findAll(listParams);
    }
}
