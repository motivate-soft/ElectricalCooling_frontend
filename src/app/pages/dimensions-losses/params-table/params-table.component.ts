import { Component, Input, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Stator } from '../../../@core/models/components/Stator';

const DEFAULT_COLUMNS = {
  parameter: {
    title: 'Parameter',
    type: 'string',
  },
  value: {
    title: 'Value',
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
  columns: DEFAULT_COLUMNS,
};

//  let key = value
//    .split(/(?=[A-Z])/)
//    .map((s) => s.toLowerCase())
//    .join("-");

const makeDataArray = (obj) =>
  Object.keys(obj).map((key) => ({
    parameter: key,
    value: obj[key],
  }));

@Component({
  selector: 'app-params-table',
  templateUrl: './params-table.component.html',
  styleUrls: ['./params-table.component.scss'],
})
export class ParamsTableComponent implements OnInit {
  @Input() columns: any;
  @Input() data: any;

  settings = SETTINGS;

  source: LocalDataSource = new LocalDataSource();

  constructor() { }

  ngOnInit(): void {
    if (this.columns) {
      this.settings = { ...SETTINGS, columns: this.columns };
    }
    this.source.load(makeDataArray(this.data));
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    if (window.confirm('Are you sure you want to edit?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
