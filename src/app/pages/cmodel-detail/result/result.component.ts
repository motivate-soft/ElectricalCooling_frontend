import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CoolingModelService } from '../../../@core/service/cooling-model.service';
import { NgxToastrService } from '../../../@core/service/toast.service';


@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss'],
})

export class ResultComponent implements OnInit {
    constructor(
        private cmodelService: CoolingModelService,
        private toastrService: NgxToastrService,
    ) { }

    ngOnInit(): void {
    }

    onClickSolve(): void {
        this.cmodelService.solve().subscribe(
            data => {
                this.toastrService.showToast('success', 'Success', 'successfully solved!');
            },
            error => {
                this.toastrService.showToast('warning', 'Oops', 'Server error!');
            }
        )
    }
}
