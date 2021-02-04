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
        return this.httpClient.post(`${Api}/${resourceUrl}Service/Query${resourceUrl}`, model);
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
        return this.httpClient.post(`${Api}/${resourceUrl}Service/Query${resourceUrl}Count`, model);
    }
    queryById(resourceUrl: string, model: any): Observable<any> {
        return this.httpClient.post(`${Api}/${resourceUrl}Service/Get${resourceUrl}`, model);
    }
}
