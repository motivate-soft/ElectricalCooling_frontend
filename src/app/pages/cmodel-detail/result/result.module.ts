import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../../@theme/theme.module';
import { NbButtonModule, NbCardModule, NbTabsetModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ResultComponent } from './result.component';
import { WindingChartComponent } from './winding-chart/winding-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { ResultTemperatureComponent } from './temperature/temperature.component';



@NgModule({
    imports: [
        FormsModule,
        ThemeModule,
        NbCardModule,
        NbButtonModule,
        NbButtonModule,
        Ng2SmartTableModule,
        NgxEchartsModule,
        NgxChartsModule,
        ChartModule,
    ],
    declarations: [ResultComponent, ResultTemperatureComponent, WindingChartComponent],
    exports: [ResultComponent],
})
export class ResultModule {
}
