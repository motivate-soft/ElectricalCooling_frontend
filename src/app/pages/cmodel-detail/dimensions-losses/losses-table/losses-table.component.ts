import { Component, Input, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CoolingModelService } from '../../../../@core/service/cooling-model.service';

const LOSSES_COLUMNS = {
  name: {
    title: 'Fluid Name',
    type: 'string',
  },
  region: {
    title: 'Region',
    type: 'string',
  },
  loss: {
    title: 'Loss',
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
  },
  edit: {
    editButtonContent: '<i class="nb-edit"></i>',
    saveButtonContent: '<i class="nb-checkmark"></i>',
    cancelButtonContent: '<i class="nb-close"></i>',
    confirmSave: true
  },
  delete: {
    deleteButtonContent: '<i class="nb-trash"></i>',
    confirmDelete: true,
  },
  columns: LOSSES_COLUMNS,
};

const makeDataArray = (arr) =>
  arr.map((item) => ({
    name: item.Name,
    region: item.Region,
    loss: item.Loss,
  }));

@Component({
  selector: 'app-losses',
  templateUrl: './losses-table.component.html',
  styleUrls: ['./losses-table.component.scss'],
})

export class LossesTableComponent implements OnInit {
  settings = SETTINGS;

  source: LocalDataSource = new LocalDataSource();

  constructor(private cmodelService: CoolingModelService) { }

  ngOnInit(): void {
    const data = this.cmodelService.getLossesData();
    this.source.load(makeDataArray(data));
  }


  onCreateConfirm(event): void {

  }

  onDeleteConfirm(event): void {

  }

  onEditConfirm(event): void {
    if (window.confirm('Are you sure you want to edit?')) {
      const cmodel = this.cmodelService.currentCmodel
      this.source.getAll().then(arr => {
        cmodel.Losses = arr.map(obj => ({
          Name: obj.name,
          Region: obj.region,
          Loss: obj.loss,
        }))
        this.cmodelService.currentCmodel$.next(cmodel)
        event.confirm.resolve();
      })
    } else {
      event.confirm.reject();
    }
  }
}
