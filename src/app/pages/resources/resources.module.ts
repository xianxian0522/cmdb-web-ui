import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesCommonComponent } from './resources-common/resources-common.component';
import { Menu2Component } from './menu2/menu2.component';


@NgModule({
  declarations: [ResourcesCommonComponent, Menu2Component],
  imports: [
    CommonModule,
    ResourcesRoutingModule
  ]
})
export class ResourcesModule { }
