import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { combineLatest, Subject } from 'rxjs';
import { CoolingModelService } from '../../../../@core/service/cooling-model.service';

const DEFAULT_XRANGE = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

@Component({
  selector: 'app-winding-chart',
  templateUrl: './winding-chart.component.html',
  styleUrls: ['./winding-chart.component.scss'],
})

export class WindingChartComponent implements AfterViewInit, OnDestroy {
  rotorTemperaturesData: any;
  statorTemperaturesData: any;

  rotorTemperaturesData$: Subject<any> = new Subject<any>();
  statorTemperaturesData$: Subject<any> = new Subject<any>();

  rotorChartOptions: any;
  statorChartOptions: any;

  constructor(
    private theme: NbThemeService,
    private cmodelService: CoolingModelService,
  ) { }


  ngAfterViewInit(): void {
    this.cmodelService.windingTemperaturesData$.subscribe(
      data => {
        this.rotorTemperaturesData$.next(data[0])
        this.statorTemperaturesData$.next(data[1])
      }
    )

    combineLatest([
      this.rotorTemperaturesData$,
      this.statorTemperaturesData$,
      this.theme.getJsTheme(),
    ])
      // .pipe(takeWhile(() => this.alive))
      .subscribe(([rotorTemperaturesData, statorTemperaturesData, config]: [any, any, any]) => {
        const colors: any = config.variables;
        const echarts: any = config.variables.echarts;
        if (rotorTemperaturesData === [] || statorTemperaturesData === []) return;

        this.rotorChartOptions = this.generateChartOptions(rotorTemperaturesData, colors, echarts)
        this.statorChartOptions = this.generateChartOptions(statorTemperaturesData, colors, echarts)

      })
  }

  generateChartOptions(data, colors, echarts) {
    const keyArrays = [];
    const dataArray = [];
    const colorKeys = ["primary", "success", "info", "danger", "warning"]

    let key,
      min = data[0].Temperature,
      max = data[0].Temperature;

    for (let i = 0; i < data.length; i++) {
      key = {
        RadialLocation: data[i].RadialLocation,
        TangentialLocation: data[i].TangentialLocation,
      };

      if (min > data[i].Temperature) min = data[i].Temperature
      if (max < data[i].Temperature) max = data[i].Temperature

      const index = keyArrays.findIndex(item => item.RadialLocation === key.RadialLocation && item.TangentialLocation === key.TangentialLocation);
      if (index > -1) {
        dataArray[index].push(data[i]);
      } else {
        keyArrays.push(key);
        dataArray.push([data[i]]);
      }
    }
    console.log('generateChartData', keyArrays, dataArray);

    const chartOptions = {
      backgroundColor: echarts.bg,
      color: keyArrays.map((item, index) => (colors[colorKeys[index % 5]])),
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}',
      },
      legend: {
        // left: 'left',
        type: 'scroll',
        // orient: 'horizontal',
        orient: 'vertical',
        x: 'left',
        data: keyArrays.map(item => (`${item.RadialLocation}/${item.TangentialLocation}`)),
        textStyle: {
          color: echarts.textColor,
        },
      },
      xAxis: [
        {
          type: 'category',
          data: dataArray[0].map(item => item.AxialCoordinate),
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: echarts.axisLineColor,
            },
          },
          axisLabel: {
            textStyle: {
              color: echarts.textColor,
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          min: 10 * Math.floor(min / 10),
          max: 10 * (Math.floor(max / 10) + 1),
          axisLine: {
            lineStyle: {
              color: echarts.axisLineColor,
            },
          },
          splitLine: {
            lineStyle: {
              color: echarts.splitLineColor,
            },
          },
          axisLabel: {
            textStyle: {
              color: echarts.textColor,
            },
          },
        },
      ],
      grid: {
        top: '5%',
        left: '100px',
        right: '5%',
        bottom: '5%',
        containLabel: true,
      },
      series: dataArray.map((arr, index) => ({
        name: `${arr[0].RadialLocation}/${arr[0].TangentialLocation}`,
        type: 'line',
        data: arr.map(item => item.Temperature),
      })),
    };

    return chartOptions
  }

  ngOnDestroy(): void {
  }
}
