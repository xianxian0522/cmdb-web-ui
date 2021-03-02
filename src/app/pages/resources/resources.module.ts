import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesCommonComponent } from './resources-common/resources-common.component';
import { RelationCommonComponent } from './relation-common/relation-common.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzFormModule} from 'ng-zorro-antd/form';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzMessageModule} from 'ng-zorro-antd/message';
import { ResourcesCommonEditComponent } from './resources-common/resources-common-edit.component';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import { CommonFormComponent } from './common-form/common-form.component';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';


@NgModule({
  declarations: [
    ResourcesCommonComponent,
    RelationCommonComponent,
    ResourcesCommonEditComponent,
    CommonFormComponent,
  ],
  imports: [
    CommonModule,
    ResourcesRoutingModule,
    NzTableModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzPopconfirmModule,
    NzModalModule,
    NzMessageModule,
    NzSelectModule,
    NzInputNumberModule,
    NzToolTipModule,
  ]
})
export class ResourcesModule { }
