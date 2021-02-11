import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Cooling } from './../models/Cooling';
import { Observable, Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import DEMO_MODEL from '../models/demo.json';

import { Face } from './../models/Face';
import { Loss } from './../models/Loss';
import { Passage } from '../models/Passage';
import { Fluid } from '../models/Fluid';
import { CoolingModelData } from '../data/cooling-model';


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
        this.currentCmodel$.subscribe(value => this.currentCmodel = value)
    }

    getCoolingList(params: any): Observable<Cooling[]> {
        return this.apiService
            .get(
                '/cooling',
                new HttpParams({ fromObject: params })
            );
    }

    getDefaultCoolingList(): Observable<Cooling[]> {
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
            .get('/cooling' + id);
    }

    create(cmodel: any): Observable<Cooling> {
        return this.apiService
            .post('/cooling', cmodel);
    }

    update(cmodel: any): Observable<Cooling> {
        return this.apiService.put(cmodel);
    }

    delete(id: number): Observable<boolean> {
        return this.apiService.delete(id);
    }

    loadInitialData(): void {
        this.currentCmodel$.next(DEMO_MODEL);
    }

    getDimensionTabData(key: string): any[] {
        const tabObject = this.currentCmodel.Components.find((item) => item.Type === key);
        return tabObject.Parameters;
    }

    getFacesData(): Face[] {
        return this.currentCmodel.Faces;
    }

    getLossesData(): Loss[] {
        return this.currentCmodel.Losses;
    }

    getPassagesData(): Passage[] {
        return this.currentCmodel.Passages;
    }

    getFluidsData(): Fluid[] {
        return this.currentCmodel.Fluids;
    }

}