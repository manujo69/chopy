import { Component } from '@angular/core';
import { PromoBanners } from './promo-banners/promo-banners';
import { ProductShowcase } from '../products/product-showcase/product-showcase';

@Component({
  selector: 'app-home',
  imports: [PromoBanners, ProductShowcase],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
