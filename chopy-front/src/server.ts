import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');
const CHOPY_BACK_URL = 'http://localhost:3000';

const app = express();
const angularApp = new AngularNodeAppEngine();

function buildQueryString(params: Record<string, unknown>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      search.set(key, String(value));
    }
  }
  const query = search.toString();
  return query ? `?${query}` : '';
}

/**
 * BFF: reenvía las peticiones de productos del navegador hacia chopy-back.
 * El navegador nunca conoce la dirección de chopy-back.
 */
app.get('/api/products', async (req, res) => {
  const { limit, skip, q, category } = req.query;
  try {
    const upstream = await fetch(
      `${CHOPY_BACK_URL}/api/products${buildQueryString({ limit, skip, q, category })}`,
    );
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});

/**
 * BFF: reenvía la petición del escaparate hacia chopy-back, que es quien
 * combina internamente productos y categorías en una sola respuesta.
 */
app.get('/api/showcase', async (req, res) => {
  const { limit } = req.query;
  try {
    const upstream = await fetch(`${CHOPY_BACK_URL}/api/showcase${buildQueryString({ limit })}`);
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener el escaparate' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
