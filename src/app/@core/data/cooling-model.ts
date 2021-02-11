import { Observable } from "rxjs";
import { Cooling } from "../models/Cooling";
import { Face } from "../models/Face";
import { Fluid } from "../models/Fluid";
import { Loss } from "../models/Loss";
import { Passage } from "../models/Passage";

export abstract class CoolingModelData {

    abstract getCoolingList(params: any): Observable<Cooling[]>;

    abstract getDefaultCoolingList(): Observable<Cooling[]>;

    abstract get(id: number): Observable<Cooling>;

    abstract create(cmodel: any): Observable<Cooling>;

    abstract update(cmodel: any): Observable<Cooling>;

    abstract delete(id: number): Observable<boolean>;

    abstract loadInitialData(): void;

    abstract getDimensionTabData(key: string): any[];

    abstract getFacesData(): Face[];

    abstract getLossesData(): Loss[];

    abstract getPassagesData(): Passage[];

    abstract getFluidsData(): Fluid[];
}