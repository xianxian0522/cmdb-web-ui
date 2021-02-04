import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {ResourcesCommonComponent} from './resources-common/resources-common.component';
import {getRoutes} from '../../share/services/routes';

const routes: Routes = [
  {path: '', redirectTo: 'appMember', pathMatch: 'full'},
  // {path: 'appMember', component: ResourcesCommonComponent},
  // {path: 'app', component: ResourcesCommonComponent},
  // {path: 'bizMember', component: ResourcesCommonComponent},
  // {path: 'biz', component: ResourcesCommonComponent},
  // {path: 'cluster', component: ResourcesCommonComponent},
  // {path: 'evn', component: ResourcesCommonComponent},
  // {path: 'host', component: ResourcesCommonComponent},
  // {path: 'idc', component: ResourcesCommonComponent},
  // {path: 'instance', component: ResourcesCommonComponent},
  // {path: 'logicIdcEnv', component: ResourcesCommonComponent},
  // {path: 'logicIdc', component: ResourcesCommonComponent},
  // {path: 'programmingLanguage', component: ResourcesCommonComponent},
  // {path: 'replicaSetMember', component: ResourcesCommonComponent},
  // {path: 'replicaSet', component: ResourcesCommonComponent},
  // {path: 'repository', component: ResourcesCommonComponent},
  // {path: 'user', component: ResourcesCommonComponent},
  // {path: 'vcs', component: ResourcesCommonComponent},
];

@NgModule({
  imports: [RouterModule.forChild(getRoutes())],
  exports: [RouterModule]
})
export class ResourcesRoutingModule {}
