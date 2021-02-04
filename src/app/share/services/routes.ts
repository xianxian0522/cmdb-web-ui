import {ResourcesCommonComponent} from '../../pages/resources/resources-common/resources-common.component';
import {Routes} from '@angular/router';
import {HttpClient} from '@angular/common/http';

export class GetServicesRoutes {
    constructor(private http: HttpClient) {
    }
    getHttp(): HttpClient {
        return this.http;
    }
}

export function getRoutes(): Routes {
    const http = GetServicesRoutes.prototype.getHttp();
    // http.post(`/api/v1/AppMemberService/GetAppMember`, null).subscribe(res => {
    //   console.log(res);
    // });
    const r = [
        {path: '', redirectTo: 'appMember', pathMatch: 'full'},
        {path: 'appMember', component: ResourcesCommonComponent},
        {path: 'app', component: ResourcesCommonComponent},
        {path: 'bizMember', component: ResourcesCommonComponent},
        {path: 'biz', component: ResourcesCommonComponent},
        {path: 'cluster', component: ResourcesCommonComponent},
        {path: 'evn', component: ResourcesCommonComponent},
        {path: 'host', component: ResourcesCommonComponent},
        {path: 'idc', component: ResourcesCommonComponent},
        {path: 'instance', component: ResourcesCommonComponent},
        {path: 'logicIdcEnv', component: ResourcesCommonComponent},
        {path: 'logicIdc', component: ResourcesCommonComponent},
        {path: 'programmingLanguage', component: ResourcesCommonComponent},
        {path: 'replicaSetMember', component: ResourcesCommonComponent},
        {path: 'replicaSet', component: ResourcesCommonComponent},
        {path: 'repository', component: ResourcesCommonComponent},
        {path: 'user', component: ResourcesCommonComponent},
        {path: 'vcs', component: ResourcesCommonComponent},
    ];
    return r;
}
