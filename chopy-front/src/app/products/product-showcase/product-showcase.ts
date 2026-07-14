import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductsService } from '../products.service';
import { ProductFilterState } from '../product-filter-state.service';
import { ProductCard } from '../product-card/product-card';
import { Pagination } from '../pagination/pagination';
import { Product } from '../product.model';

const PAGE_SIZE = 20;

@Component({
  selector: 'app-product-showcase',
  imports: [ProductCard, Pagination],
  templateUrl: './product-showcase.html',
  styleUrl: './product-showcase.scss',
})
export class ProductShowcase {
  private readonly productsService = inject(ProductsService);
  private readonly filterState = inject(ProductFilterState);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private requestId = 0;
  private isFirstFilterEffectRun = true;

  protected readonly page = toSignal(
    this.route.queryParamMap.pipe(map((params) => Math.max(1, Number(params.get('page')) || 1))),
    { requireSync: true },
  );

  protected readonly products = signal<Product[]>([]);
  protected readonly total = signal(0);
  protected readonly loading = signal(false);
  protected readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / PAGE_SIZE)));

  constructor() {
    effect(() => {
      const page = this.page();
      untracked(() => this.fetchPage(page));
    });

    effect(() => {
      this.filterState.searchQuery();
      this.filterState.selectedCategory();
      if (this.isFirstFilterEffectRun) {
        this.isFirstFilterEffectRun = false;
        return;
      }
      untracked(() => {
        if (this.page() === 1) {
          this.fetchPage(1);
        } else {
          this.goToPage(1);
        }
      });
    });
  }

  protected goToPage(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  private fetchPage(page: number): void {
    const id = ++this.requestId;
    const filter = {
      q: this.filterState.searchQuery() || undefined,
      category: this.filterState.selectedCategory() ?? undefined,
    };
    const skip = (page - 1) * PAGE_SIZE;

    this.loading.set(true);

    const request$ =
      page === 1 && !filter.q && !filter.category
        ? this.productsService.getShowcase(PAGE_SIZE).pipe(
            map((data) => {
              this.filterState.setCategories(data.categories);
              return data.products;
            }),
          )
        : this.productsService.getProducts(skip, PAGE_SIZE, filter);

    request$.subscribe({
      next: (data) => {
        if (id !== this.requestId) {
          return;
        }
        this.products.set(data.items);
        this.total.set(data.total);
        this.loading.set(false);
      },
      error: (err) => {
        if (id !== this.requestId) {
          return;
        }
        console.error(err);
        this.loading.set(false);
      },
    });
  }
}
