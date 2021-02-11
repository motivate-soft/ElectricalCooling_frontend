import { Component, OnInit } from '@angular/core';
import { CoolingModelService } from '../@core/service/cooling-model.service';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  constructor(private service: CoolingModelService) {
    this.service.loadInitialData()
  }

  ngOnInit(): void {
  }

  menu = MENU_ITEMS;
}
