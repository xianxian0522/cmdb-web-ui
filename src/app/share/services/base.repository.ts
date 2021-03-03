import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

const Api = '/api/v1';

@Injectable({
    providedIn: 'root'
})
export class BaseRepository<MODEL extends {id?: number}>{
    protected constructor(protected httpClient: HttpClient) {}

    queryPage(resourceUrl: string, model: any): Observable<any> {
        const body = this.genParams(model);
        return this.httpClient.post(`${Api}/${resourceUrl}Service/Query${resourceUrl}`, body);
    }
    add(resourceUrl: string, model: any): Observable<any> {
        return this.httpClient.post(`${Api}/${resourceUrl}Service/Create${resourceUrl}`, model);
    }
    update(resourceUrl: string, model: any): Observable<any> {
        return this.httpClient.post(`${Api}/${resourceUrl}Service/Update${resourceUrl}`, model);
    }
    delete(resourceUrl: string, model: any): Observable<any> {
        return this.httpClient.post(`${Api}/${resourceUrl}Service/Delete${resourceUrl}`, model);
    }
    queryCount(resourceUrl: string, model: any): Observable<any> {
        const body = this.genParams(model);
        return this.httpClient.post(`${Api}/${resourceUrl}Service/Query${resourceUrl}Count`, body);
    }
    queryById(resourceUrl: string, model: any): Observable<any> {
        return this.httpClient.post(`${Api}/${resourceUrl}Service/Get${resourceUrl}`, model);
    }
    getModel(resourceUrl: string): Observable<any> {
        return this.httpClient.get(`${Api}/${resourceUrl}Service/GetModel`);
    }

    getAllModel(): Observable<any>{
        return this.httpClient.get(`${Api}/GetAllModels`);
    }

    protected genParams(q?: {[key: string]: any}): any {
        const body = {};
        const addValue = (key, value) => {
            if (value === 0 || value === false || value) {
                body[key] = value;
            }
        };
        if (q) {
            Object.keys(q).forEach(k => {
                const v = q[k];
                // if (v instanceof Array) {
                //     v.forEach(vv => addValue(k, vv));
                //     return;
                // }
                addValue(k, v);
            });
        }
        return body;
    }
}
