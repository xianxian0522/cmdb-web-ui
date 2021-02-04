import {HttpClient} from '@angular/common/http';

const Api = '/api/v1';

export class BaseRepository<MODEL extends {id?: number}>{
    protected constructor(protected httpClient: HttpClient) {}

}
