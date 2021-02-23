import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModelRoutingModule} from './model-routing.module';
import {GraphComponent} from './graph/graph.component';
import {Menu22Component} from './menu22/menu22.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [
    GraphComponent,
    Menu22Component
  ],
  imports: [
    CommonModule,
    ModelRoutingModule,
    NzButtonModule,
    NzIconModule,
  ]
})
export class ModelModule { }
