import { Component, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { LucidePlus } from '@lucide/angular';
import { CartService } from '../../cart/cart.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe, LucidePlus],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  private readonly cart = inject(CartService);

  readonly product = input.required<Product>();

  protected addToCart(): void {
    this.cart.addItem(this.product());
  }
}
