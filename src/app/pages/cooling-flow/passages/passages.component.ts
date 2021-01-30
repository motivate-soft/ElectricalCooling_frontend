import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { PassagesService } from "../../../@core/mock/passages.service";
import { Fluid } from "./../../../models/Fluid";
const PASSAGES_COLUMNS = {
  passage: {
    title: "Passage",
    type: "string",
  },
  in_passage: {
    title: "In Passage",
    type: "string",
  },
  out_passage: {
    title: "Out Passage",
    type: "number",
  },
  flow_rate: {
    title: "Flow Rate (m3/s)",
    type: "number",
  },
  fluid: {
    title: "Fluid",
    type: "string",
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
  columns: PASSAGES_COLUMNS,
};
@Component({
  selector: "ngx-passages",
  templateUrl: "./passages.component.html",
  styleUrls: ["./passages.component.scss"],
})
export class PassagesComponent implements OnInit {
  settings = SETTINGS;
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: PassagesService) {}

  ngOnInit(): void {
    const data = this.service.getData();

    this.source.load(
      data.map((item) => ({
        passage: item.Passage,
        in_passage: item.In_Passage,
        out_passage: item.Out_Passage,
        flow_rate: item.Flow_Rate,
        fluid: item.Fluid,
      }))
    );
  }
  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
