import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductFilterState {
  readonly categories = signal<string[]>([]);
  readonly searchQuery = signal('');
  readonly selectedCategory = signal<string | null>(null);

  setCategories(categories: string[]): void {
    this.categories.set(categories);
  }

  setSearch(query: string): void {
    this.searchQuery.set(query);
  }

  setCategory(category: string | null): void {
    this.selectedCategory.set(category);
  }
}
