import { Component, OnInit } from '@angular/core';
import { CoolingModelService } from '../../@core/service/cooling-model.service';
import { Cooling } from './../../@core/models/Cooling';


@Component({
  selector: 'app-cmodel-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['detail.component.scss'],
})
export class DetailComponent implements OnInit {
  cmodel: Cooling;

  constructor(private cmodelService: CoolingModelService) {
  }

  ngOnInit(): void {
    this.cmodelService.loadInitialData()
    this.cmodel = this.cmodelService.currentCmodel
  }

  onChangeModelName($event): void {
    // const cmodel = this.cmodelService.currentCmodel
    // cmodel.name = $event.target.value
    // this.cmodelService.currentCmodel$.next(cmodel);
  }

  onClickSave(): void {
    this.cmodelService.currentCmodel$.next(this.cmodel);
    this.cmodelService.create().subscribe(
      data => console.log('data', data),
      err => {
        console.log('err', err)
      }
    );
  }

}
