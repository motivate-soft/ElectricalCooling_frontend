import { Component, Input, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { LossesService } from "./../../../@core/mock/losses.service";

const LOSSES_COLUMNS = {
  name: {
    title: "Fluid Name",
    type: "string",
  },
  region: {
    title: "Region",
    type: "string",
  },
  loss: {
    title: "Loss",
    type: "number",
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
  columns: LOSSES_COLUMNS,
};

const makeDataArray = (arr) =>
  arr.map((item) => ({
    name: item.Name,
    region: item.Region,
    loss: item.Loss,
  }));

@Component({
  selector: "ngx-losses",
  templateUrl: "./losses-table.component.html",
  styleUrls: ["./losses-table.component.scss"],
})
export class LossesTableComponent implements OnInit {
  settings = SETTINGS;

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: LossesService) {}

  ngOnInit(): void {
    const data = this.service.getData();
    this.source.load(makeDataArray(data));
    console.log("__LossesTableComponent", makeDataArray(data));
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
