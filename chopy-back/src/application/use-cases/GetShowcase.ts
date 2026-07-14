import { Product } from '../../domain/entities/Product.js';
import { Paginated } from '../../domain/shared/Paginated.js';
import { ListProducts } from './ListProducts.js';
import { ListCategories } from './ListCategories.js';

export interface ShowcaseResult {
    products: Paginated<Product>;
    categories: string[];
}

export class GetShowcase {
    constructor(
        private readonly listProducts: ListProducts,
        private readonly listCategories: ListCategories,
    ) {}

    async execute(limit: number): Promise<ShowcaseResult> {
        const [products, categories] = await Promise.all([
            this.listProducts.execute({ skip: 0, limit }),
            this.listCategories.execute(),
        ]);
        return { products, categories };
    }
}
