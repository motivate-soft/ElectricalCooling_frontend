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
    confirmSave: true
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
    const data = this.cmodelService.getPassagesData();

    this.source.load(
      data.map((item) => ({
        passage: item.Passage,
        in_passage: item.In_Passage,
        out_passage: item.Out_Passage,
        flow_rate: item.Flow_Rate,
        fluid: item.Fluid,
      })),
    );
  }


  onCreateConfirm(event): void {

  }

  onDeleteConfirm(event): void {

  }

  onEditConfirm(event): void {
    if (window.confirm('Are you sure you want to edit?')) {
      const cmodel = this.cmodelService.currentCmodel
      this.source.getAll().then(arr => {
        cmodel.Passages = arr.map(obj => ({
          Passage: obj.passage,
          In_passage: obj.in_passage,
          Out_passag: obj.out_passage,
          Flow_rate: obj.flow_rate,
          Fluid: obj.fluid
        }))
        this.cmodelService.currentCmodel$.next(cmodel)
        event.confirm.resolve();
      })
    } else {
      event.confirm.reject();
    }
  }
}
