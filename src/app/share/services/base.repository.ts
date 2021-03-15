import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {TokenResponse} from '../mode/token';

const Api = '/api/v1';

@Injectable({
    providedIn: 'root'
})
export class BaseRepository<MODEL extends {id?: number}>{
    protected constructor(protected httpClient: HttpClient) {}

    token(): Observable<TokenResponse>{
        return this.httpClient.get<TokenResponse>(`${Api}/sso/login`);
    }
    login(): Observable<any> {
        return this.httpClient.get(`${Api}/sso/loginOAuth`);
    }

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
                addValue(k, v);
            });
        }
        return body;
    }
}
