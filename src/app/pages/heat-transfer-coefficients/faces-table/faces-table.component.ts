import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { FacesService } from '../../../@core/mock/faces.service';
import { ShowcaseDialogComponent } from '../showcase-dialog/showcase-dialog.component';

const FACES_COLUMNS = {
  face: {
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
  columns: FACES_COLUMNS,
};

@Component({
  selector: 'ngx-faces-table',
  templateUrl: './faces-table.component.html',
  styleUrls: ['./faces-table.component.scss'],
})
export class FacesTableComponent implements OnInit {
  settings = SETTINGS;

  source: LocalDataSource = new LocalDataSource();

  constructor(private facesService: FacesService, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    const data = this.facesService.getData();
    this.source.load(data.map(item => ({
      name: item.Name,
      passage: item.Passage,
      calculation: item.Calculation
    })));
  }

  open() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
