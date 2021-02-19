import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoolingModelService } from '../../@core/service/cooling-model.service';
import { Cooling } from './../../@core/models/Cooling';
import { Location } from '@angular/common';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';


@Component({
  selector: 'app-cmodel-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['detail.component.scss'],
})
export class DetailComponent implements OnInit {
  title: string;

  cmodel: Cooling;
  idParam: string;

  types: NbComponentStatus[] = [
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];

  constructor(
    private cmodelService: CoolingModelService,
    private route: ActivatedRoute,
    private location: Location,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.getCmodel();
  }

  getCmodel(): void {
    this.route.params.subscribe(params => {
      this.idParam = params[`id`];

      if (!!this.idParam) {
        this.title = "Edit your model"
        this.cmodelService.get(parseInt(this.idParam)).subscribe(
          data => {
            this.cmodelService.currentCmodel$.next(data);
            this.cmodel = data
          },
          error => {
            console.log('error', error)
          }
        )
      } else {
        this.title = "Create a new model"
        this.cmodelService.loadInitialData()
        this.cmodel = this.cmodelService.currentCmodel
      }
    });
  }

  onChangeModelName($event): void {

  }

  onClickSave(): void {
    if (!!this.idParam) {
      this.cmodelService.update().subscribe(
        data => {
          this.cmodelService.currentCmodel$.next(this.cmodel);
          this.showToast("success", "Success", "successfully updated!")
        },
        error => {
          this.showToast("warning", "Oops", "Server error!")
        }
      );
    } else {
      this.cmodelService.create().subscribe(
        data => {
          this.cmodelService.currentCmodel$.next(this.cmodel);
          this.showToast("success", "Success", "successfully created!")
        },
        error => {
          this.showToast("warning", "Oops", "Server error!")
        }
      );
    }
  }

  private showToast(type: NbComponentStatus, title: string = '', body: string = '') {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };

    this.toastrService.show(
      body,
      title,
      config);
  }

  goBack(): void {
    this.location.back();
  }
}
