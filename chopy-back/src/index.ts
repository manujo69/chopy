import express from 'express';
import { DummyJsonProductRepository } from './infrastructure/dummyjson/adapters/DummyJsonProductRepository.js';
import { ListProducts } from './application/use-cases/ListProducts.js';
import { ListCategories } from './application/use-cases/ListCategories.js';
import { GetShowcase } from './application/use-cases/GetShowcase.js';
import { createProductsRouter } from './infrastructure/http/routes/productsRouter.js';

const app = express();
const PORT = 3000;

const productRepository = new DummyJsonProductRepository();
const listProducts = new ListProducts(productRepository);
const listCategories = new ListCategories(productRepository);
const getShowcase = new GetShowcase(listProducts, listCategories);

app.use('/api', createProductsRouter(listProducts, listCategories, getShowcase));

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
