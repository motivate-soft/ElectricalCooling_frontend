import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { Dimensions } from "../../../@core/data/dimensions";

@Component({
  selector: "ngx-dimensions",
  templateUrl: "./dimensions.component.html",
  styleUrls: ["./dimensions.component.scss"],
})
export class DimensionsComponent implements OnInit {
  data: any;
  housingParams: any;
  statorParams: any;
  rotorParams: any;
  operationParams: any;
  windingParams: any;
  magnetParams: any;

  constructor(private service: Dimensions) {}

  ngOnInit(): void {
    const data = this.service.getData();
    this.housingParams = this.service.getTabData("Housing");
    this.statorParams = this.service.getTabData("Stator");
    this.rotorParams = this.service.getTabData("Rotor");
    this.operationParams = this.service.getTabData("Operation");
    this.windingParams = this.service.getTabData("Winding");
    this.magnetParams = this.service.getTabData("Magnet");

    console.log("DimensionsComponent", this.housingParams);
    console.log("DimensionsComponent", this.statorParams);
    console.log("DimensionsComponent", this.rotorParams);
    console.log("DimensionsComponent", this.operationParams);
    console.log("DimensionsComponent", this.windingParams);
    console.log("DimensionsComponent", this.magnetParams);
  }
}
