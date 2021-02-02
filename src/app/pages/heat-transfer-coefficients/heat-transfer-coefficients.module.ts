import { NgModule } from '@angular/core';
import { HeatTransferCoefficientsComponent } from './heat-transfer-coefficients.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartModule } from 'angular2-chartjs';
import { NbButtonModule, NbCardModule, NbDialogModule } from '@nebular/theme';
import { HtcChartComponent } from './htc-chart/htc-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HtcsTableComponent } from './htcs-table/htcs-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FacesTableComponent } from './faces-table/faces-table.component';
import { ShowcaseDialogComponent } from './showcase-dialog/showcase-dialog.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    Ng2SmartTableModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbDialogModule.forChild()
  ],
  declarations: [
    HeatTransferCoefficientsComponent,
    HtcChartComponent,
    HtcsTableComponent,
    FacesTableComponent,
    ShowcaseDialogComponent
  ],
})
export class HeatTransferCoefficientsModule { }
