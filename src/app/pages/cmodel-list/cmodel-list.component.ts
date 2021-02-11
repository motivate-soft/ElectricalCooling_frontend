import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoolingModelService } from '../../@core/service/cooling-model.service';
import { Cooling } from './../../@core/models/Cooling';

@Component({
  selector: 'app-cmodel-list',
  templateUrl: './cmodel-list.component.html',
  styleUrls: ['./cmodel-list.component.scss'],
})

export class CmodelListComponent implements OnInit {
  cmodels: Cooling[];

  constructor(private cmodelService: CoolingModelService, private router: Router) {
    this.cmodels = cmodelService.cmodels
  }

  ngOnInit(): void {

  }

  onAddClick($event) {
    console.log('$event', $event)
    this.router.navigate(['/pages/cmodel/new']);
  }
}
