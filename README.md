# Chopy

Tienda online de demostración construida como monorepo con dos proyectos Node independientes (sin `package.json`/workspace compartido en la raíz):

- **`chopy-front/`** — aplicación Angular 20 (standalone components, SSR con `@angular/ssr`). Sirve la web y actúa de servidor SSR (`src/server.ts`).
- **`chopy-back/`** — API Express (BFF) que expone productos, categorías, carritos, usuarios y login, consumiendo [DummyJSON](https://dummyjson.com/) como origen de datos.
- **`docs-data.json`** — copia estática del spec OpenAPI de [FakeStoreAPI](https://fakestoreapi.com/docs), usada como referencia de forma de los endpoints (`/products`, `/carts`, `/users`, `/auth/login`).

## Arquitectura

`chopy-front/src/server.ts` renderiza la app en el servidor (SSR): al recibir una petición, arranca Angular, que pide los datos a `chopy-back` (el BFF), inyecta esos datos en los componentes y devuelve el HTML ya resuelto al navegador. Tras la hidratación, la navegación posterior del cliente pide JSON directamente al BFF sin recargar la página.

`chopy-back` no conoce nada de HTML ni de Angular: solo expone JSON. El navegador nunca llama a `chopy-back` directamente — siempre pasa por el proxy `/api/*` que expone `chopy-front/src/server.ts`, para no exponer la URL del BFF al cliente.

Diagrama y detalle completo del flujo de una petición: [ARQUITECTURA.md](ARQUITECTURA.md).

## Puesta en marcha

Cada proyecto se instala y arranca por separado.

```bash
# Backend (BFF) — puerto 3000
cd chopy-back
npm install
npm run dev

# Frontend (Angular SSR) — puerto 4200
cd chopy-front
npm install
npm start
```

Con ambos arrancados, la app está disponible en `http://localhost:4200`.

## Documentación adicional

- [ARQUITECTURA.md](ARQUITECTURA.md) — flujo detallado de una petición SSR.
- [CLAUDE.md](CLAUDE.md) — guía de comandos y convenciones del repositorio para trabajar con Claude Code.
- [chopy-front/README.md](chopy-front/README.md) — comandos generados por Angular CLI (build, tests, scaffolding).
