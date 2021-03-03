import { Component, OnInit } from '@angular/core';
import { CoolingModelService } from '../../../../@core/service/cooling-model.service';

@Component({
  selector: 'app-dimensions',
  templateUrl: './dimensions.component.html',
  styleUrls: ['./dimensions.component.scss'],
})
export class DimensionsComponent implements OnInit {
  data: any;
  tabList: string[] = ['Stator', 'Housing', 'Rotor', 'Winding', 'Magnet', 'Operation'];

  constructor(private cmodelService: CoolingModelService) { }

  ngOnInit(): void {
  }

}
