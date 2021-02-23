import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GraphComponent} from './graph/graph.component';
import {Menu22Component} from './menu22/menu22.component';

const routes: Routes = [
  {path: '', redirectTo: 'graph', pathMatch: 'full'},
  {path: 'graph', component: GraphComponent},
  {path: 'menu22', component: Menu22Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelRoutingModule { }
