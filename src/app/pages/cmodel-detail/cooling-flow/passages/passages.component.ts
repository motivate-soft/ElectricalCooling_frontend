import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CoolingModelService } from '../../../../@core/service/cooling-model.service';

const PASSAGES_COLUMNS = {
  passage: {
    title: 'Passage',
    type: 'string',
  },
  in_passage: {
    title: 'In Passage',
    type: 'string',
  },
  out_passage: {
    title: 'Out Passage',
    type: 'number',
  },
  flow_rate: {
    title: 'Flow Rate (m3/s)',
    type: 'number',
  },
  fluid: {
    title: 'Fluid',
    type: 'string',
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
    confirmSave: true,
  },
  delete: {
    deleteButtonContent: '<i class="nb-trash"></i>',
    confirmDelete: true,
  },
  columns: PASSAGES_COLUMNS,
};

@Component({
  selector: 'app-passages',
  templateUrl: './passages.component.html',
  styleUrls: ['./passages.component.scss'],
})

export class PassagesComponent implements OnInit {
  settings = SETTINGS;
  source: LocalDataSource = new LocalDataSource();

  constructor(private cmodelService: CoolingModelService) { }

  ngOnInit(): void {
    this.cmodelService.currentCmodel$.subscribe(value => {
      this.source.load(value.passages);
    });
  }

  onCreateConfirm(event): void {

  }

  onDeleteConfirm(event): void {

  }

  onEditConfirm(event): void {
    if (window.confirm('Are you sure you want to edit?')) {
      const cmodel = this.cmodelService.currentCmodel;
      const index = cmodel.passages.indexOf(event.data);
      cmodel.passages[index] = event.newData;
      this.cmodelService.currentCmodel$.next(cmodel);
      // event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
