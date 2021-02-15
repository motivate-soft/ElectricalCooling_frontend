import { Component, Input, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Stator } from '../../../../@core/models/components/Stator';
import { CoolingModelService } from '../../../../@core/service/cooling-model.service';


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
  data: any[];
  source: LocalDataSource = new LocalDataSource();

  constructor(private cmodelService: CoolingModelService) { }

  ngOnInit(): void {
    this.data = this.cmodelService.getDimensionTabData(this.title);
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
      console.log("editConfirm", event, event.newData);
      const cmodel = this.cmodelService.currentCmodel
      const parameter = event.newData.parameter
      const value = event.newData.value
      console.log('parameter, value, this.title', parameter, value, this.title)

      cmodel.Components.forEach(item => {
        if (item.Type === this.title) {
          item.Parameters[parameter] = value
        }
      })
      this.cmodelService.currentCmodel$.next(cmodel)
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
