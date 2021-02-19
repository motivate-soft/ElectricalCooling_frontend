import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { CoolingModelService } from '../../@core/service/cooling-model.service';
import { Cooling } from './../../@core/models/Cooling';

@Component({
  selector: 'app-cmodel-list',
  templateUrl: './cmodel-list.component.html',
  styleUrls: ['./cmodel-list.component.scss'],
})

export class CmodelListComponent implements OnInit {
  cmodels: Cooling[];

  types: NbComponentStatus[] = [
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];

  constructor(
    private cmodelService: CoolingModelService,
    private toastrService: NbToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCoolingList()
  }

  getCoolingList(): void {
    this.cmodelService.getList().subscribe(
      data => {
        this.cmodelService.cmodels$.next(data);
        this.cmodels = this.cmodelService.cmodels;
      },
      error => {
        console.log('error', error)
      }
    );
  }

  onAddClick($event) {
    console.log('$event', $event)
    this.router.navigate(['/pages/cmodel/new']);
  }

  onDeleteClick(id: number) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.cmodelService.delete(id).subscribe(
        data => {
          const array = this.cmodelService.cmodels.filter(obj => obj.id !== id)
          this.cmodelService.cmodels$.next(array);
          this.cmodels = array;
          this.showToast("success", "Success", "successfully deleted!")
        },
        error => {
          this.showToast("warning", "Oops", "Server error!")
        }
      )
    } else {
      return;
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
}
