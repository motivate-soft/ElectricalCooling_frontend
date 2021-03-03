import { Component, Input, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Stator } from '../../../../@core/models/components/Stator';
import { CoolingModelService } from '../../../../@core/service/cooling-model.service';
import { Cooling } from './../../../../@core/models/Cooling';
import { map } from 'rxjs/operators';


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
  columns: {
    parameter: {
      title: 'Parameter',
      type: 'string',
    },
    value: {
      title: 'Value',
      type: 'number',
    },
  },
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
  @Input() title: string;

  settings = SETTINGS;
  _cmodel: Cooling;
  source: LocalDataSource = new LocalDataSource();

  constructor(private cmodelService: CoolingModelService) { }

  ngOnInit(): void {
    this.cmodelService.currentCmodel$.subscribe(value => {
      const tabObject = value.components.find((item) => item.type === this.title);
      this._cmodel = value;
      this.source.load(makeDataArray(tabObject.parameters));
    });
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
      const index = this._cmodel.components.findIndex(item => item.type === this.title);
      this._cmodel.components[index].parameters[event.newData.parameter] = event.newData.value;
      console.log('event', event);
      console.log('this._cmodel', this._cmodel);
      this.cmodelService.currentCmodel$.next(this._cmodel);
      // event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
