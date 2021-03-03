import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoolingModelService } from '../../@core/service/cooling-model.service';
import { Cooling } from './../../@core/models/Cooling';
import { Location } from '@angular/common';
import { NgxToastrService } from './../../@core/service/toast.service';


@Component({
  selector: 'app-cmodel-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['detail.component.scss'],
})
export class DetailComponent implements OnInit {
  title: string;

  cmodel: Cooling = {
    id: '',
    name: '',
    components: [],
    faces: [],
    losses: [],
    passages: [],
    fluids: []
  };
  idParam: string;

  constructor(
    private cmodelService: CoolingModelService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private toastrService: NgxToastrService,
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
          this.toastrService.showToast("success", "Success", "successfully updated!")
          this.router.navigate(['/pages/cmodel']);
        },
        error => {
          this.toastrService.showToast("warning", "Oops", "Server error!")
        }
      );
    } else {
      this.cmodelService.create().subscribe(
        data => {
          this.cmodelService.currentCmodel$.next(this.cmodel);
          this.toastrService.showToast("success", "Success", "successfully created!")
          this.router.navigate(['/pages/cmodel']);
        },
        error => {
          this.toastrService.showToast("warning", "Oops", "Server error!")
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }
}
