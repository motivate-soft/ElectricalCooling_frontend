import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { FacesService } from '../../../@core/mock/faces.service';
import { ShowcaseDialogComponent } from '../showcase-dialog/showcase-dialog.component';

const DATA = [
  {
    "Name": "BarrelGap",
    "Passage": "BarrelGap_Core",
    "Calculation": "CFD"
  },
  {
    "Name": "AirGapRotor",
    "Passage": "AirGap-TopIP_Core",
    "Calculation": "CFD"
  },
  {
    "Name": "AirGapStator",
    "Passage": "AirGap-TopIP_Core",
    "Calculation": "CFD"
  },
  {
    "Name": "TopIP",
    "Passage": "AirGap-TopIP_Core",
    "Calculation": "CFD"
  },
  {
    "Name": "BtmIP",
    "Passage": "BtmIP_Core",
    "Calculation": "CFD"
  },
  {
    "Name": "RotorFace",
    "Passage": "None",
    "Calculation": 50
  },
  {
    "Name": "RotorSideEW",
    "Passage": "None",
    "Calculation": "EndRegion"
  },
  {
    "Name": "RotorTopEW",
    "Passage": "None",
    "Calculation": "EndRegion"
  },
  {
    "Name": "RotorGapEW",
    "Passage": "None",
    "Calculation": "EndRegion"
  },
  {
    "Name": "Shaft",
    "Passage": "None",
    "Calculation": 50
  },
  {
    "Name": "Housing",
    "Passage": "None",
    "Calculation": 20
  },
  {
    "Name": "StatorWindingGapEW",
    "Passage": "None",
    "Calculation": "EndRegion"
  },
  {
    "Name": "StatorOuterEW",
    "Passage": "None",
    "Calculation": "EndRegion"
  },
  {
    "Name": "StatorInnerEW",
    "Passage": "None",
    "Calculation": "EndRegion"
  }
]

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
  selector: 'ngx-faces-table',
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
      face: {
        title: 'Face',
        type: 'string'
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
            console.log('__instance', instance)
            console.log('__this', this)
            this.openModal(row)
          });
        },
      },
    },
  };

  data: any[];
  source: LocalDataSource = new LocalDataSource();

  constructor(private facesService: FacesService, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    // const data = this.facesService.getData();
    this.data = DATA.map(item => ({
      face: item.Name,
      passage: item.Passage,
      calculation: item.Calculation
    }));
    this.source.load(this.data);
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
        // const selectedRowIndex = this.data.findIndex(item => item === rowData)
        if (!setName) return;
        const selectedRowIndex = this.data.indexOf(rowData)
        console.log('selectedRowIndex', selectedRowIndex)
        console.log('rowData', rowData)
        console.log('setName', setName)
        const calc = rowData.calculation.split(":")[0]
        this.data[selectedRowIndex] = { ...rowData, calculation: `${calc}:${setName}` }
        this.source.load(this.data)
      });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
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
