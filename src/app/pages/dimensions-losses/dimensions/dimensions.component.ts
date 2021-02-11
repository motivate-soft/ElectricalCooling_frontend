import { Component, OnInit } from '@angular/core';
import { CoolingModelService } from '../../../@core/service/cooling-model.service';

@Component({
  selector: 'app-dimensions',
  templateUrl: './dimensions.component.html',
  styleUrls: ['./dimensions.component.scss'],
})
export class DimensionsComponent implements OnInit {
  data: any;
  housingParams: any;
  statorParams: any;
  rotorParams: any;
  operationParams: any;
  windingParams: any;
  magnetParams: any;

  constructor(private cmodelService: CoolingModelService) { }

  ngOnInit(): void {
    this.housingParams = this.cmodelService.getDimensionTabData('Housing');
    this.statorParams = this.cmodelService.getDimensionTabData('Stator');
    this.rotorParams = this.cmodelService.getDimensionTabData('Rotor');
    this.operationParams = this.cmodelService.getDimensionTabData('Operation');
    this.windingParams = this.cmodelService.getDimensionTabData('Winding');
    this.magnetParams = this.cmodelService.getDimensionTabData('Magnet');

    console.log('DimensionsComponent', this.housingParams);
  }
}
