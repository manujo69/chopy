import { ProductRepository } from '../../domain/ports/ProductRepository.js';

export class ListCategories {
    constructor(private readonly productRepository: ProductRepository) {}

    execute(): Promise<string[]> {
        return this.productRepository.getCategories();
    }
}
