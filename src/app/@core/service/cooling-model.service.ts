import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Cooling } from '../models/Cooling';
import { Observable, Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import modelData from '../models/cooling_model.json';


import { CoolingModelData } from '../data/cooling-model';
import { ConvertKeysToLowerCase, ConvertKeysToUpperCase } from './utils';
import { map } from 'rxjs/operators';


@Injectable()
export class CoolingModelService extends CoolingModelData {
  user: any;
  cmodels: Cooling[];
  currentCmodel: Cooling;
  windingTemperaturesData = [];
  componentTemperaturesData = [];
  // rotorWindingData = [];
  // statorWindingData = [];

  cmodels$: Subject<Cooling[]> = new Subject<Cooling[]>();
  currentCmodel$: Subject<Cooling> = new Subject<Cooling>();
  windingTemperaturesData$: Subject<any> = new Subject<any>();
  componentTemperaturesData$: Subject<any> = new Subject<any>();


  constructor(
    private apiService: ApiService,
    private authService: NbAuthService,
  ) {
    super();
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });
    this.cmodels$.subscribe(value => this.cmodels = value);
    this.currentCmodel$.subscribe(value => { console.log('___this.currentCmodel$.subscribe___', value); this.currentCmodel = value; });
  }

  getList(params: any = {}): Observable<Cooling[]> {
    if (this.user.is_staff) {
      return this.apiService
        .get(
          '/cooling',
          new HttpParams({ fromObject: params }),
        );
    }
    return this.apiService
      .get(
        '/cooling/me',
        new HttpParams({ fromObject: params }),
      );
  }

  getMyList(params: any = {}): Observable<Cooling[]> {
    return this.apiService
      .get(
        '/cooling/me',
        new HttpParams({ fromObject: params }),
      );
  }

  get(id: number): Observable<Cooling> {
    return this.apiService
      .get(`/cooling/me/${id}`);
  }

  getDefaultModel(): Observable<Cooling> {
    return this.apiService
      .get(`/cooling/demo_model`);
  }

  create(cmodel: any = this.currentCmodel): Observable<Cooling> {
    return this.apiService
      .post('/cooling/me', cmodel).pipe(map(
        data => {
          console.log('create', data);
          return data;
        },
        err => console.log('err', err),
      ));
  }

  update(cmodel: any = this.currentCmodel): Observable<Cooling> {
    const { owner } = cmodel;
    cmodel.owner = owner.id;
    return this.apiService.put(`/cooling/me/${cmodel.id}`, cmodel).pipe(map(
      data => {
        console.log('update', data);
        return data;
      },
      err => console.log('err', err),
    ));
  }

  delete(id: number): Observable<boolean> {
    return this.apiService.delete('/cooling/me/' + id).pipe(map(
      data => {
        console.log('delete', data);
        return data;
      },
      err => console.log('err', err),
    ));
  }

  solve(inputParams: any = this.currentCmodel): Observable<any> {
    console.log('request_solve', inputParams);
    // console.log('request_solve', ConvertKeysToUpperCase(inputParams.passages))

    return this.apiService.post('/cooling/solve', inputParams).pipe(map(
      data => {
        this.windingTemperaturesData$.next(data.winding_temperatures);
        this.componentTemperaturesData$.next(data.component_temperatures);
        console.log('response', data);
        return data;
      },
      err => console.log('err', err),
    ));
  }
}
