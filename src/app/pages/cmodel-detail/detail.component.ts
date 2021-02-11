import {Component, OnInit} from '@angular/core';
import {CoolingModelService} from '../../@core/service/cooling-model.service';


@Component({
  selector: 'app-cmodel-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['detail.component.scss'],
})
export class DetailComponent implements OnInit {
  constructor(private service: CoolingModelService) {
    this.service.loadInitialData()
  }

  ngOnInit(): void {
  }

  onClickSave():void {

  }

}
