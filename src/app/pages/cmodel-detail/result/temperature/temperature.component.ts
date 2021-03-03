import { Component, OnInit } from '@angular/core';
import { CoolingModelService } from '../../../../@core/service/cooling-model.service';

@Component({
    selector: 'app-result-temperature',
    templateUrl: 'temperature.component.html',
})

export class ResultTemperatureComponent implements OnInit {
    constructor(
        public cmodelService: CoolingModelService,
    ) { }

    ngOnInit() {
    }
}
