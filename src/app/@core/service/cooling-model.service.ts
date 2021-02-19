import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Cooling } from '../models/Cooling';
import { Observable, Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import modelData from '../models/cooling_model.json';

import { Face } from '../models/Face';
import { Loss } from '../models/Loss';
import { Passage } from '../models/Passage';
import { Fluid } from '../models/Fluid';
import { CoolingModelData } from '../data/cooling-model';
import { ConvertKeysToLowerCase } from './utils';
import { map } from 'rxjs/operators';


@Injectable()
export class CoolingModelService extends CoolingModelData {
  user: any;
  cmodels: Cooling[];
  currentCmodel: Cooling;

  cmodels$: Subject<Cooling[]> = new Subject<Cooling[]>();
  currentCmodel$: Subject<Cooling> = new Subject<Cooling>();


  constructor(
    private apiService: ApiService,
    private authService: NbAuthService,
  ) {
    super()
    this.cmodels$.subscribe(value => this.cmodels = value)
    this.currentCmodel$.subscribe(value => { console.log('___this.currentCmodel$.subscribe___', value); this.currentCmodel = value })
  }

  getList(params: any = {}): Observable<Cooling[]> {
    return this.apiService
      .get(
        '/cooling',
        new HttpParams({ fromObject: params })
      );
  }

  getDefaultList(): Observable<Cooling[]> {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });
    const params = { author: this.user.id }
    return this.apiService
      .get(
        '/cooling',
        new HttpParams({ fromObject: params })
      );
  }

  get(id: number): Observable<Cooling> {
    return this.apiService
      .get(`/cooling/${id}`);
  }

  create(cmodel: any = this.currentCmodel): Observable<Cooling> {
    return this.apiService
      .post('/cooling', cmodel).pipe(map(
        data => {
          console.log('create', data)
          return data;
        }
      ))
  }

  update(cmodel: any = this.currentCmodel): Observable<Cooling> {
    return this.apiService.put(`/cooling/${cmodel.id}`, cmodel).pipe(map(
      data => {
        console.log('update', data)
        return data;
      }
    ));
  }

  delete(id: number): Observable<boolean> {
    return this.apiService.delete('/cooling/' + id).pipe(map(
      data => {
        console.log('delete', data)
        return data;
      }
    ));
  }

  loadInitialData(): void {
    // console.log('DEMO_MODEL', ConvertKeysToLowerCase(DEMO_MODEL))
    this.currentCmodel$.next({
      ...modelData,
      id: ''
    });
  }

  getDimensionTabData(key: string): any[] {
    const tabObject = this.currentCmodel.components.find((item) => item.type === key);
    return tabObject.parameters;
  }

  getFacesData(): Face[] {
    return this.currentCmodel.faces;
  }

  getLossesData(): Loss[] {
    return this.currentCmodel.losses;
  }

  getPassagesData(): Passage[] {
    return this.currentCmodel.passages;
  }

  getFluidsData(): Fluid[] {
    return this.currentCmodel.fluids;
  }

}
