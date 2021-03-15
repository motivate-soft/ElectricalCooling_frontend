import { Observable } from 'rxjs';
import { Cooling } from '../models/Cooling';

export abstract class CoolingModelData {

    abstract getList(params: any): Observable<Cooling[]>;

    abstract getMyList(params: any): Observable<Cooling[]>;

    abstract getDefaultModel(): Observable<Cooling>;

    abstract get(id: number): Observable<Cooling>;

    abstract create(cmodel: any): Observable<Cooling>;

    abstract update(cmodel: any): Observable<Cooling>;

    abstract delete(id: number): Observable<boolean>;

}
