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
  actions: {
    add: false,
    edit: true,
    delete: false,
  },
  add: {
    addButtonContent: '<i class="nb-plus"></i>',
    createButtonContent: '<i class="nb-checkmark"></i>',
    cancelButtonContent: '<i class="nb-close"></i>',
    confirmCreate: true,
  },
  edit: {
    editButtonContent: '<i class="nb-edit"></i>',
    saveButtonContent: '<i class="nb-checkmark"></i>',
    cancelButtonContent: '<i class="nb-close"></i>',
    confirmSave: true,
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
    this.cmodelService.currentCmodel$.subscribe(value => {
      this.source.load(value.fluids);
    });
  }

  onCreateConfirm(event): void {

  }

  onDeleteConfirm(event): void {

  }

  onEditConfirm(event): void {
    if (window.confirm('Are you sure you want to edit?')) {
      const cmodel = this.cmodelService.currentCmodel;
      const index = cmodel.fluids.indexOf(event.data);
      cmodel.fluids[index] = event.newData;
      this.cmodelService.currentCmodel$.next(cmodel);
      // event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
