import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { LucideMail, LucidePhone, LucideShoppingBasket, LucideUser } from '@lucide/angular';
import { ProductFilters } from '../../products/product-filters/product-filters';
import { ProductFilterState } from '../../products/product-filter-state.service';
import { CartService } from '../../cart/cart.service';

const SEARCH_DEBOUNCE_MS = 300;

@Component({
  selector: 'app-header',
  imports: [ProductFilters, DecimalPipe, LucideMail, LucidePhone, LucideShoppingBasket, LucideUser],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly filterState = inject(ProductFilterState);
  protected readonly cart = inject(CartService);

  private readonly searchInput$ = new Subject<string>();

  constructor() {
    this.searchInput$.pipe(debounceTime(SEARCH_DEBOUNCE_MS), distinctUntilChanged()).subscribe((query) => {
      this.filterState.setSearch(query);
    });
  }

  protected onSearchChange(query: string): void {
    this.searchInput$.next(query);
  }

  protected onCategoryChange(category: string | null): void {
    this.filterState.setCategory(category);
  }
}
