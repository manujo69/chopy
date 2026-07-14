import { Component, input, output } from '@angular/core';
import { LucideSearch } from '@lucide/angular';

@Component({
  selector: 'app-product-filters',
  imports: [LucideSearch],
  templateUrl: './product-filters.html',
  styleUrl: './product-filters.scss',
})
export class ProductFilters {
  categories = input<string[]>([]);
  searchQuery = input('');
  selectedCategory = input<string | null>(null);

  searchChange = output<string>();
  categoryChange = output<string | null>();

  onSearchInput(event: Event): void {
    this.searchChange.emit((event.target as HTMLInputElement).value);
  }

  onCategoryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.categoryChange.emit(value || null);
  }
}
