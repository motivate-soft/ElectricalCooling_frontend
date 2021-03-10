import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { CoolingModelService } from '../../@core/service/cooling-model.service';
import { NgxToastrService } from '../../@core/service/toast.service';
import { Cooling } from './../../@core/models/Cooling';

@Component({
  selector: 'app-cmodel-list',
  templateUrl: './cmodel-list.component.html',
  styleUrls: ['./cmodel-list.component.scss'],
})

export class CmodelListComponent implements OnInit {
  cmodels: Cooling[];

  constructor(
    private cmodelService: CoolingModelService,
    private toastrService: NgxToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCoolingList();
  }

  getCoolingList(): void {
    this.cmodelService.getList().subscribe(
      data => {
        this.cmodelService.cmodels$.next(data);
        this.cmodels = this.cmodelService.cmodels;
      },
      error => {
        console.log('error', error);
      },
    );
  }

  onAddClick($event) {
    console.log('$event', $event);
    this.router.navigateByUrl('/cmodel/new');
  }

  onDeleteClick(id: number) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.cmodelService.delete(id).subscribe(
        data => {
          const array = this.cmodelService.cmodels.filter(obj => obj.id !== id);
          this.cmodelService.cmodels$.next(array);
          this.cmodels = array;
          this.toastrService.showToast('success', 'Success', 'successfully deleted!');
        },
        error => {
          this.toastrService.showToast('warning', 'Oops', 'Server error!');
        },
      );
    } else {
      return;
    }
  }
}
