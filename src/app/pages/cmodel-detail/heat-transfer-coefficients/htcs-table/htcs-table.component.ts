import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HtcsService } from '../../../../@core/service/htcs.service';
import { HTC } from '../../../../@core/models/HTC';

const HTCS_COLUMNS = {
  name: {
    title: 'HTC Data Name',
    type: 'string',
  },
  x: {
    title: 'X-Range',
    type: 'number',
  },
  y: {
    title: 'Y-Range',
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
  columns: HTCS_COLUMNS,
};

@Component({
  selector: 'app-htcs-table',
  templateUrl: './htcs-table.component.html',
  styleUrls: ['./htcs-table.component.scss'],
})
export class HtcsTableComponent implements OnInit {
  settings = SETTINGS;
  source: LocalDataSource = new LocalDataSource();

  constructor(private htcsService: HtcsService) {

  }

  ngOnInit(): void {
    this.source.load(this.htcsService.getCoords());
  }

  onFileChange($event): void {
    const file = $event.target.files[0]
    this.readFile(file)
  }

  async readFile(file) {
    const resultText: any = await this.loadCSV(file);
    const array = new Array();
    const jsonObject = resultText.split(/\r?\n|\r/);
    for (let i = 0; i < jsonObject.length; i++) {
      array.push(jsonObject[i].split(','));
    }
    this.htcsService.htcs = array.map(item => ({
      x: item[0],
      ag: item[1],
      bg: item[2],
      tip: item[3],
      bip: item[4],
    }))
    this.source.load(this.htcsService.getCoords());
  }

  async loadCSV(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
      console.log('__reader', reader)
      reader.readAsText(file);
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
