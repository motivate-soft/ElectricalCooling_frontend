import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class ApiData {
    abstract get(path: string, params: HttpParams): Observable<any>
    abstract put(path: string, body: Object): Observable<any>
    abstract post(path: string, body: Object): Observable<any>
    abstract delete(path: string): Observable<any>
}
