import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CoolingModelService } from '../../../../@core/service/cooling-model.service';

const FLUIDS_COLUMNS = {
  name: {
    title: 'Fluid Name',
    type: 'string',
  },
  density: {
    title: 'Density',
    type: 'number',
  },
  conductivity: {
    title: 'Conductivity',
    type: 'number',
  },
};

const SETTINGS = {
  add: {
    addButtonContent: '<i class="nb-plus"></i>',
    createButtonContent: '<i class="nb-checkmark"></i>',
    cancelButtonContent: '<i class="nb-close"></i>',
  },
  edit: {
    editButtonContent: '<i class="nb-edit"></i>',
    saveButtonContent: '<i class="nb-checkmark"></i>',
    cancelButtonContent: '<i class="nb-close"></i>',
  },
  delete: {
    deleteButtonContent: '<i class="nb-trash"></i>',
    confirmDelete: true,
  },
  columns: FLUIDS_COLUMNS,
};

@Component({
  selector: 'app-fluids',
  templateUrl: './fluids.component.html',
  styleUrls: ['./fluids.component.scss'],
})
export class FluidsComponent implements OnInit {
  settings = SETTINGS;
  source: LocalDataSource = new LocalDataSource();

  constructor(private cmodelService: CoolingModelService) { }

  ngOnInit(): void {
    const data = this.cmodelService.getFluidsData();

    this.source.load(
      data.map((item) => ({
        name: item.Name,
        ｄensity: item.Density,
        conductivity: item.Conductivity,
      })),
    );
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
