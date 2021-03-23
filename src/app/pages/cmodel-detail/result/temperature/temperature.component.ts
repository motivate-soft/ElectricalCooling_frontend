import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CoolingModelService } from '../../../../@core/service/cooling-model.service';

@Component({
    selector: 'app-result-temperature',
    templateUrl: 'temperature.component.html',
})

export class ResultTemperatureComponent {
    @Output() save: EventEmitter<any> = new EventEmitter();

    componentTemperaturesData = [];

    constructor(
        public cmodelService: CoolingModelService,
    ) {
        this.cmodelService.componentTemperaturesData$.subscribe(
            data => this.componentTemperaturesData = data,
        );
    }

    onClick() {
        this.save.emit();
    }
}
