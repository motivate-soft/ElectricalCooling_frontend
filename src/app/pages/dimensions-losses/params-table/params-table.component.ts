import { Component, Input, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { Stator } from "./../../../models/Stator";

const COLUMNS = {
  parameter: {
    title: "Parameter",
    type: "string",
  },
  value: {
    title: "Value",
    type: "number",
  },
};

const makeDataArray = (obj) =>
  Object.keys(obj).map((key) => ({
    parameter: key,
    value: obj[key],
  }));

@Component({
  selector: "ngx-params-table",
  templateUrl: "./params-table.component.html",
  styleUrls: ["./params-table.component.scss"],
})
export class ParamsTableComponent implements OnInit {
  @Input() data: any;

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
    columns: COLUMNS,
  };

  // data: Stator = statorData;
  source: LocalDataSource = new LocalDataSource();

  constructor() {}

  ngOnInit(): void {
    console.log("ParamsTableComponent", makeDataArray(this.data));

    this.source.load(makeDataArray(this.data));
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    if (window.confirm("Are you sure you want to edit?")) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
