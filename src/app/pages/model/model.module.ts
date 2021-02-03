import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelRoutingModule } from './model-routing.module';
import { Menu21Component } from './menu21/menu21.component';
import { Menu22Component } from './menu22/menu22.component';


@NgModule({
  declarations: [Menu21Component, Menu22Component],
  imports: [
    CommonModule,
    ModelRoutingModule
  ]
})
export class ModelModule { }
