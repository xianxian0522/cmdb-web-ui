import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import {ResourcesCommonComponent} from './resources-common/resources-common.component';
import {getRoutes, GetServicesRoutes} from '../../share/services/routes';
import {RelationCommonComponent} from './relation-common/relation-common.component';
import {HttpClient} from '@angular/common/http';
import {BaseRepository} from '../../share/services/base.repository';

const routes: Routes = [
  {path: '', redirectTo: 'AppMember', pathMatch: 'full'},

  {path: 'AppMember/relation', component: RelationCommonComponent},
  {path: 'App/relation', component: RelationCommonComponent},
  {path: 'BizMember/relation', component: RelationCommonComponent},
  {path: 'Biz/relation', component: RelationCommonComponent},
  {path: 'Cluster/relation', component: RelationCommonComponent},
  {path: 'Env/relation', component: RelationCommonComponent},
  {path: 'Host/relation', component: RelationCommonComponent},
  {path: 'Idc/relation', component: RelationCommonComponent},
  {path: 'Instance/relation', component: RelationCommonComponent},
  {path: 'LogicIdcEnv/relation', component: RelationCommonComponent},
  {path: 'LogicIdc/relation', component: RelationCommonComponent},
  {path: 'OplogConsumer/relation', component: RelationCommonComponent},
  {path: 'ProgrammingLanguage/relation', component: RelationCommonComponent},
  {path: 'ReplicaSetMember/relation', component: RelationCommonComponent},
  {path: 'ReplicaSet/relation', component: RelationCommonComponent},
  {path: 'Repository/relation', component: RelationCommonComponent},
  {path: 'SaltMaster/relation', component: RelationCommonComponent},
  {path: 'User/relation', component: RelationCommonComponent},
  {path: 'Vcs/relation', component: RelationCommonComponent},

  {path: 'AppMember', component: ResourcesCommonComponent},
  {path: 'App', component: ResourcesCommonComponent},
  {path: 'BizMember', component: ResourcesCommonComponent},
  {path: 'Biz', component: ResourcesCommonComponent},
  {path: 'Cluster', component: ResourcesCommonComponent},
  {path: 'Env', component: ResourcesCommonComponent},
  {path: 'Host', component: ResourcesCommonComponent},
  {path: 'Idc', component: ResourcesCommonComponent},
  {path: 'Instance', component: ResourcesCommonComponent},
  {path: 'LogicIdcEnv', component: ResourcesCommonComponent},
  {path: 'OplogConsumer', component: ResourcesCommonComponent},
  {path: 'LogicIdc', component: ResourcesCommonComponent},
  {path: 'ProgrammingLanguage', component: ResourcesCommonComponent},
  {path: 'ReplicaSetMember', component: ResourcesCommonComponent},
  {path: 'ReplicaSet', component: ResourcesCommonComponent},
  {path: 'Repository', component: ResourcesCommonComponent},
  {path: 'SaltMaster', component: ResourcesCommonComponent},
  {
    path: 'User', component: ResourcesCommonComponent,
    // children: [
    //   {path: 'relation', component: RelationCommonComponent},
    // ],
  },
  // {path: 'Vcs', component: ResourcesCommonComponent},
  {path: '**', component: ResourcesCommonComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule {
  // constructor(router: Router, baseRepository: BaseRepository<any>) {
  //   const config = router.config;
  //   console.log(config, 'ccc', routes, router);
  //   baseRepository.getAllModel().subscribe(res => {
  //     Object.keys(res).map(k => {
  //       routes.push({path: k, component: ResourcesCommonComponent});
  //     });
  //     console.log(res, 'routes', routes);
  //     router.resetConfig(config);
  //   });
  // }
}
