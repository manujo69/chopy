import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { CategoryNav } from './layout/category-nav/category-nav';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CategoryNav, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
