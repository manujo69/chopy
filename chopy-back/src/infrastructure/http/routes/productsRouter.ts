import { Router, Request, Response } from 'express';
import { ListProducts } from '../../../application/use-cases/ListProducts.js';
import { ListCategories } from '../../../application/use-cases/ListCategories.js';
import { GetShowcase } from '../../../application/use-cases/GetShowcase.js';

export function createProductsRouter(
    listProducts: ListProducts,
    listCategories: ListCategories,
    getShowcase: GetShowcase,
): Router {
    const router = Router();

    router.get('/products/categories', async (req: Request, res: Response) => {
        try {
            const categories = await listCategories.execute();
            res.json(categories);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al obtener las categorías' });
        }
    });

    router.get('/showcase', async (req: Request, res: Response) => {
        const limit = Number(req.query.limit) || 20;
        try {
            const result = await getShowcase.execute(limit);
            res.json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al obtener el escaparate' });
        }
    });

    router.get('/products', async (req: Request, res: Response) => {
        const limit = Number(req.query.limit) || 20;
        const skip = Number(req.query.skip) || 0;
        const q = typeof req.query.q === 'string' ? req.query.q : undefined;
        const category = typeof req.query.category === 'string' ? req.query.category : undefined;
        try {
            const result = await listProducts.execute({ limit, skip, q, category });
            res.json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al obtener los productos' });
        }
    });

    return router;
}
