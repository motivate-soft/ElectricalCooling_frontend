import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { CoolingModelService } from '../../../../@core/service/cooling-model.service';
import { ShowcaseDialogComponent } from '../showcase-dialog/showcase-dialog.component';



@Component({
  selector: 'button-view',
  template: `
    <button nbButton status="info" (click)="onClick()">HTC</button>
  `,
})

export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
    this.save.emit(this.rowData);
  }
}


@Component({
  selector: 'app-faces-table',
  templateUrl: './faces-table.component.html',
  styleUrls: ['./faces-table.component.scss'],
})
export class FacesTableComponent implements OnInit {
  settings = {
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
    actions: {
      add: true,
      edit: true,
      delete: true,
      // custom: [
      //   {
      //     name: 'openModalAction',
      //     title: '<i class="ion-document"></i>'
      //   }
      // ],
      // position: 'right'
    },
    columns: {
      name: {
        title: 'Face',
        type: 'string',
      },
      passage: {
        title: 'Passage',
        type: 'string',
      },
      calculation: {
        title: 'Calculation',
        type: 'string',
      },
      button: {
        title: '',
        type: 'custom',
        width: '100px',
        editable: false,
        filter: false,
        renderComponent: ButtonViewComponent,
        onComponentInitFunction: (instance: any) => {
          instance.save.subscribe(row => {
            console.log('onComponentInitFunction', row);
            this.openModal(row);
          });
        },
      },
    },
  };

  data: any[];
  source: LocalDataSource = new LocalDataSource();

  constructor(private cmodelService: CoolingModelService, private dialogService: NbDialogService) {

  }

  ngOnInit(): void {
    this.cmodelService.currentCmodel$.subscribe(value => {
      this.data = value.faces;
      this.source.load(this.data);
    });
  }

  openModal(rowData: any) {
    this.dialogService
      .open(ShowcaseDialogComponent, {
        context: {
          title: 'HTC',
          rowData: rowData,
        },
      })
      .onClose.subscribe(setName => {
        if (!setName) return;

        const selectedRowIndex = this.data.indexOf(rowData);
        console.log('selectedRowIndex, rowData, setName', selectedRowIndex, rowData, setName);

        const calc = rowData.calculation.split(':')[0];
        this.data[selectedRowIndex] = { ...rowData, calculation: `${calc}:${setName}` };
        this.source.load(this.data);
      });
  }

  onCreateConfirm(event): void {

  }

  onDeleteConfirm(event): void {

  }

  onEditConfirm(event): void {
    if (window.confirm('Are you sure you want to edit?')) {
      const cmodel = this.cmodelService.currentCmodel;
      const index = cmodel.faces.indexOf(event.data);
      cmodel.faces[index] = event.newData;
      this.cmodelService.currentCmodel$.next(cmodel);
      // event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  // onCustomAction(event) {
  //   if (event.action === 'openModalAction') {
  //     this.openModal();
  //   }
  // }
}
