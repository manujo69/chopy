import { Component, inject } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { ProductFilterState } from '../../products/product-filter-state.service';
import { CATEGORY_NAV_ITEMS, CategoryNavItem } from './category-nav-items';

@Component({
  selector: 'app-category-nav',
  imports: [LucideDynamicIcon],
  templateUrl: './category-nav.html',
  styleUrl: './category-nav.scss',
})
export class CategoryNav {
  private readonly filterState = inject(ProductFilterState);

  protected readonly items = CATEGORY_NAV_ITEMS;

  protected isActive(item: CategoryNavItem): boolean {
    return item.slug === this.filterState.selectedCategory();
  }

  protected onSelect(item: CategoryNavItem): void {
    this.filterState.setCategory(item.slug);
  }
}
