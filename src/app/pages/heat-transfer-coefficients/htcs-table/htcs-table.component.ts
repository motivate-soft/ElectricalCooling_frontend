import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { HtcsService } from "../../../@core/mock/htcs.service";

const HTCS_COLUMNS = {
  name: {
    title: "HTC Data Name",
    type: "string",
  },
  x: {
    title: "X-Range",
    type: "number",
  },
  y: {
    title: "Y-Range",
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
  columns: HTCS_COLUMNS,
};

@Component({
  selector: "ngx-htcs-table",
  templateUrl: "./htcs-table.component.html",
  styleUrls: ["./htcs-table.component.scss"],
})
export class HtcsTableComponent implements OnInit {
  settings = SETTINGS;
  source: LocalDataSource = new LocalDataSource();
  constructor(private service: HtcsService) {}

  ngOnInit(): void {
    const coords = this.service.getCoords();
    console.log("__HtcsTableComponent", this.service.getCoords());
    this.source.load(coords);
  }
  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
