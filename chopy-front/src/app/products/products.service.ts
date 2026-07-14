import { Injectable, PLATFORM_ID, StateKey, TransferState, inject, makeStateKey } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { Observable, of, tap } from 'rxjs';
import { ProductFilter, ProductsPage, ShowcaseData } from './product.model';

const CHOPY_BACK_URL = 'http://localhost:3000';
const SHOWCASE_KEY = makeStateKey<ShowcaseData>('showcase');

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly transferState = inject(TransferState);

  getProducts(skip: number, limit: number, filter: ProductFilter = {}): Observable<ProductsPage> {
    const base = isPlatformServer(this.platformId) ? `${CHOPY_BACK_URL}/api/products` : '/api/products';
    const params = this.buildParams({ skip, limit, q: filter.q, category: filter.category });
    const key = makeStateKey<ProductsPage>(`products:${skip}:${limit}:${filter.q ?? ''}:${filter.category ?? ''}`);
    return this.fetchWithTransferState(key, () => this.http.get<ProductsPage>(base, { params }));
  }

  getShowcase(limit: number): Observable<ShowcaseData> {
    const base = isPlatformServer(this.platformId) ? `${CHOPY_BACK_URL}/api/showcase` : '/api/showcase';
    return this.fetchWithTransferState(SHOWCASE_KEY, () =>
      this.http.get<ShowcaseData>(base, { params: this.buildParams({ limit }) }),
    );
  }

  // SSR y navegador piden URLs distintas a propósito (para no exponer chopy-back
  // al navegador ni hacer que SSR se llame a sí mismo), así que el TransferState
  // automático de HttpClient no puede deduplicar por URL. Lo hacemos a mano con
  // una clave propia por petición: el servidor guarda el resultado, el cliente lo
  // consume una vez al hidratar y solo vuelve a pedir la API si esa clave no existe
  // (p. ej. porque esa combinación de página/filtro no se renderizó en SSR).
  private fetchWithTransferState<T>(key: StateKey<T>, request: () => Observable<T>): Observable<T> {
    const cached = this.transferState.get(key, null);
    if (cached) {
      this.transferState.remove(key);
      return of(cached);
    }

    return request().pipe(
      tap((data) => {
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(key, data);
        }
      }),
    );
  }

  private buildParams(values: Record<string, string | number | undefined>): HttpParams {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(values)) {
      if (value !== undefined && value !== '') {
        params = params.set(key, value);
      }
    }
    return params;
  }
}
