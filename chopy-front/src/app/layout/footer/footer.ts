import { Component } from '@angular/core';
import { FOOTER_COLUMNS } from './footer-links';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly columns = FOOTER_COLUMNS;
  protected readonly year = new Date().getFullYear();
}
