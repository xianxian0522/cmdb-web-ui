import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Menu1Component} from './menu1/menu1.component';
import {Menu2Component} from './menu2/menu2.component';

const routes: Routes = [
  {path: '', redirectTo: 'appMember', pathMatch: 'full'},
  {path: 'appMember', component: Menu1Component},
  {path: 'app', component: Menu1Component},
  {path: 'bizMember', component: Menu1Component},
  {path: 'biz', component: Menu1Component},
  {path: 'cluster', component: Menu1Component},
  {path: 'evn', component: Menu1Component},
  {path: 'host', component: Menu1Component},
  {path: 'idc', component: Menu1Component},
  {path: 'instance', component: Menu1Component},
  {path: 'logicIdcEnv', component: Menu1Component},
  {path: 'logicIdc', component: Menu1Component},
  {path: 'programmingLanguage', component: Menu1Component},
  {path: 'replicaSetMember', component: Menu1Component},
  {path: 'replicaSet', component: Menu1Component},
  {path: 'repository', component: Menu1Component},
  {path: 'user', component: Menu1Component},
  {path: 'vcs', component: Menu1Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
