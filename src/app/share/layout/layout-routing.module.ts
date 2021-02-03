import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout.component';

const routes: Routes = [
  {
    path: 'resources',
    data: {section: 'resources'},
    component: LayoutComponent,
    loadChildren: () => import('../../pages/resources/resources.module').then(m => m.ResourcesModule)
  },
  {
    path: 'model',
    data: {section: 'model'},
    component: LayoutComponent,
    loadChildren: () => import('../../pages/model/model.module').then(m => m.ModelModule)
  },
  {
    path: '**', component: LayoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
