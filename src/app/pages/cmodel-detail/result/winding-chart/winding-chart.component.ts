import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { CoolingModelService } from '../../../../@core/service/cooling-model.service';
import { HtcsService } from '../../../../@core/service/htcs.service';

const DEFAULT_XRANGE = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

@Component({
  selector: 'app-winding-chart',
  templateUrl: './winding-chart.component.html',
  styleUrls: ['./winding-chart.component.scss'],
})
export class WindingChartComponent implements OnInit, OnDestroy {
  rotorChartData: any;
  statorChartData: any;
  options: any;
  themeSubscription: any;

  constructor(
    private theme: NbThemeService,
    private cmodelService: CoolingModelService,
  ) { }

  ngOnInit(): void {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.rotorChartData = this.generateDatasets(this.cmodelService.getRotorWindingData(), colors);
      this.statorChartData = this.generateDatasets(this.cmodelService.getStatorWindingData(), colors);
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

  generateDatasets(data, colors) {
    const keyArrays = [];
    const dataArray = [];
    let key;
    for (let i = 0; i < data.length; i++) {
      key = {
        RadialLocation: data[i].RadialLocation,
        TangentialLocation: data[i].TangentialLocation,
      };
      const index = keyArrays.findIndex(item => item.RadialLocation === key.RadialLocation && item.TangentialLocation === key.TangentialLocation);
      if (index > -1) {
        dataArray[index].push(data[i]);
      } else {
        keyArrays.push(key);
        dataArray.push([data[i]]);
      }
    }
    console.log('dataArray', data, keyArrays, dataArray);
    const colorKeys = ['primary', 'success', 'warning', 'danger'];

    return {
      labels: dataArray[0].map(item => item.AxialCoordinate),
      datasets: dataArray.map((arr, index) => {
        return {
          data: arr.map(item => item.Temperature),
          label: `${arr[0].RadialLocation}-${arr[0].TangentialLocation}`,
          backgroundColor: 'transparent',
          borderColor: colors[colorKeys[index % 4]],
        };
      }),
    };
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
