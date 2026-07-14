import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

type PageEntry = number | 'ellipsis';

const SIBLING_COUNT = 1;

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  readonly page = input.required<number>();
  readonly totalPages = input.required<number>();

  protected readonly pages = computed<PageEntry[]>(() => {
    const total = this.totalPages();
    const current = this.page();
    const left = Math.max(2, current - SIBLING_COUNT);
    const right = Math.min(total - 1, current + SIBLING_COUNT);

    const entries: PageEntry[] = [1];
    if (left > 2) {
      entries.push('ellipsis');
    }
    for (let i = left; i <= right; i++) {
      entries.push(i);
    }
    if (right < total - 1) {
      entries.push('ellipsis');
    }
    if (total > 1) {
      entries.push(total);
    }
    return entries;
  });
}
