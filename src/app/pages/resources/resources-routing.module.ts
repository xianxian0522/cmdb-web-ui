import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {ResourcesCommonComponent} from './resources-common/resources-common.component';
import {getRoutes, GetServicesRoutes} from '../../share/services/routes';
import {RelationCommonComponent} from './relation-common/relation-common.component';

const routes: Routes = [
  {path: '', redirectTo: 'appMember', pathMatch: 'full'},

  {path: 'appMember/relation', component: RelationCommonComponent},
  {path: 'app/relation', component: RelationCommonComponent},
  {path: 'bizMember/relation', component: RelationCommonComponent},
  {path: 'biz/relation', component: RelationCommonComponent},
  {path: 'cluster/relation', component: RelationCommonComponent},
  {path: 'env/relation', component: RelationCommonComponent},
  {path: 'host/relation', component: RelationCommonComponent},
  {path: 'idc/relation', component: RelationCommonComponent},
  {path: 'instance/relation', component: RelationCommonComponent},
  {path: 'logicIdcEnv/relation', component: RelationCommonComponent},
  {path: 'logicIdc/relation', component: RelationCommonComponent},
  {path: 'programmingLanguage/relation', component: RelationCommonComponent},
  {path: 'replicaSetMember/relation', component: RelationCommonComponent},
  {path: 'replicaSet/relation', component: RelationCommonComponent},
  {path: 'repository/relation', component: RelationCommonComponent},
  {path: 'user/relation', component: RelationCommonComponent},
  {path: 'vcs/relation', component: RelationCommonComponent},

  {path: 'appMember', component: ResourcesCommonComponent},
  {path: 'app', component: ResourcesCommonComponent},
  {path: 'bizMember', component: ResourcesCommonComponent},
  {path: 'biz', component: ResourcesCommonComponent},
  {path: 'cluster', component: ResourcesCommonComponent},
  {path: 'env', component: ResourcesCommonComponent},
  {path: 'host', component: ResourcesCommonComponent},
  {path: 'idc', component: ResourcesCommonComponent},
  {path: 'instance', component: ResourcesCommonComponent},
  {path: 'logicIdcEnv', component: ResourcesCommonComponent},
  {path: 'logicIdc', component: ResourcesCommonComponent},
  {path: 'programmingLanguage', component: ResourcesCommonComponent},
  {path: 'replicaSetMember', component: ResourcesCommonComponent},
  {path: 'replicaSet', component: ResourcesCommonComponent},
  {path: 'repository', component: ResourcesCommonComponent},
  {
    path: 'user', component: ResourcesCommonComponent,
    // children: [
    //   {path: 'relation', component: RelationCommonComponent},
    // ],
  },
  {path: 'vcs', component: ResourcesCommonComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule {}
