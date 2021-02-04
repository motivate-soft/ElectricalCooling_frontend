import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { HtcsService } from '../../../@core/mock/htcs.service';

const DEFAULT_XRANGE = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

@Component({
  selector: 'ngx-htc-chart',
  templateUrl: './htc-chart.component.html',
  styleUrls: ['./htc-chart.component.scss'],
})
export class HtcChartComponent implements OnInit, OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  constructor(
    private theme: NbThemeService,
    private htcsService: HtcsService,
  ) { }

  ngOnInit(): void {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: this.htcsService.getXRange(),
        datasets: [
          {
            data: this.htcsService.getAGs(),
            label: 'AG',
            backgroundColor: 'transparent',
            borderColor: colors.primary,
          },
          {
            data: this.htcsService.getBGs(),
            label: 'BG',
            backgroundColor: 'transparent',
            borderColor: colors.danger,
          },
          {
            data: this.htcsService.getBIPs(),
            label: 'BIP',
            backgroundColor: 'transparent',
            borderColor: colors.info,
          },
          {
            data: this.htcsService.getTIPs(),
            label: 'TIP',
            backgroundColor: 'transparent',
            borderColor: colors.warning,
          },
        ],
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
