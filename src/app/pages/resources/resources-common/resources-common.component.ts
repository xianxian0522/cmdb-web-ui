import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {BaseRepository} from '../../../share/services/base.repository';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {merge, Subscription} from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {LayoutComponent} from '../../../share/layout/layout.component';
import {NzMessageService} from 'ng-zorro-antd/message';
import { NzModalService} from 'ng-zorro-antd/modal';
import {ResourcesCommonEditComponent} from './resources-common-edit.component';
import {QuestionServices} from '../../../share/services/question.services';
import {QuestionBase} from '../../../share/mode/question.base';

@Component({
  selector: 'app-menu1',
  templateUrl: './resources-common.component.html',
  styleUrls: ['./resources-common.component.scss']
})
export class ResourcesCommonComponent implements OnInit, AfterViewInit {

  constructor(
      private baseRepository: BaseRepository<any>,
      private fb: FormBuilder,
      private layoutComponent: LayoutComponent,
      private messageService: NzMessageService,
      private modalService: NzModalService,
      private questionServices: QuestionServices,
  ) { }

  searchForm: FormGroup = this.fb.group({});
  searchQuestions: QuestionBase<string>[];
  @Output() refresh = new EventEmitter();
  data = [];
  total = 1;
  pageSize = 10;
  pageIndex = 1;
  isLoadingResults = true;
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  @ViewChild(NzTableComponent) table: NzTableComponent;
  resourceUrl: string;
  colNames;

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  onCurrentPageDataChange(): void {
    this.refreshCheckedStatus();
  }
  refreshCheckedStatus(): void {
    const data = this.data;
    this.checked = data.every(({ ID }) => this.setOfCheckedId.has(ID));
    this.indeterminate = data.some(({ ID }) => this.setOfCheckedId.has(ID)) && !this.checked;
  }
  onAllChecked(checked: boolean): void {
    this.data.forEach(({ ID }) => this.updateCheckedSet(ID, checked));
    this.refreshCheckedStatus();
  }
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  getEnum(v: string, list): string {
    // Enum可枚举的V是填的值 N是展示的值
    return list.filter(value => value.V === v).map(n => n.N);
  }
  objectData(data: any, id: string): any {
    if (!data) {
      return [];
    }
    if (data instanceof Array) {
      const arr = data.map(k => ({title: id, content: data}));
      // console.log(arr, 'array');
      return arr;
    } else {
      const arr = Object.keys(data).map((k: any) => {
        if (data[k] instanceof Array) {
          return this.objectData(data[k], k)[0];
        } else {
          return ({title: k, content: data[k]});
        }
      });
      // console.log(arr, 'objetc');
      return arr;
    }
  }

  ngOnInit(): void {
    this.resourceUrl = this.layoutComponent.baseTitle || 'AppMember';
    console.log(this.resourceUrl, 'url');

    this.baseRepository.getModel(this.resourceUrl).subscribe(col => {
      this.colNames = Object.keys(col.Properties).map(key => {
        return {
          name: col.Properties[key].Description ? col.Properties[key].Description : key,
          id: key,
          list: col.Properties[key].Enum ? col.Properties[key].Enum : null,
          type: col.Properties[key].Type,
        };
      });
      let arr = Object.keys(col.Properties).map(key => ({id: key, ...col.Properties[key],
        isEnum: col.Properties[key].hasOwnProperty('Enum')}));
      arr = arr.filter(item => item.Type === 'string');
      arr.map(item => {
        if (item.isEnum) {
          item.id = item.id + 'EQ';
        }
      });
      this.searchQuestions = arr;
      this.searchForm = this.questionServices.toTextFormGroup(arr);
      // console.log(this.colNames, arr, this.searchForm);
      // const value = this.searchForm.value;
      // console.log(value, 'value');
      // Object.keys(value).map(key => {
      //   this.searchForm.get(key).valueChanges.subscribe(r => console.log(r, 'xxx'));
      // });
      this.searchForm.valueChanges.subscribe(r => this.refresh.emit());
    });
  }
  ngAfterViewInit(): void {
    merge(this.refresh, this.table.nzPageIndexChange, this.table.nzPageSizeChange).pipe(
      debounceTime(200),
      switchMap(_ => {
        const obj = {...this.searchForm.value};
        return this.baseRepository.queryCount(this.resourceUrl, obj);
      })
    ).subscribe(count => {
      this.total = count;
    });

    merge(this.refresh, this.table.nzPageIndexChange, this.table.nzPageSizeChange)
      .pipe(
        debounceTime(200),
        switchMap(() => {
          this.isLoadingResults = true;
          const obj = {
            Limit: this.table.nzPageSize,
            Offset: (this.table.nzPageIndex - 1) * this.table.nzPageSize,
            ...this.searchForm.value
          };
          return this.baseRepository.queryPage(this.resourceUrl, obj);
        }),
        map(data => {
          this.isLoadingResults = false;
          return data;
        })
      ).subscribe(res => {
        this.data = res ? res : [];
    });
    this.refresh.emit();
  }

  showCreateDialog(): void {
    this.modalService.create({
      nzFooter: null,
      nzComponentParams: {data: {}, mode: 'create', resourceUrl: this.resourceUrl},
      nzContent: ResourcesCommonEditComponent,
      nzWidth: '90vw',
    }).afterClose.subscribe(_ => {
      if (_) {
        this.refresh.emit();
      }
    });
  }
  showEditDialog(ele): void {
    this.modalService.create({
      nzContent: ResourcesCommonEditComponent,
      nzFooter: null,
      nzComponentParams: {data: ele, mode: 'edit', resourceUrl: this.resourceUrl},
      nzWidth: '90vw',
    }).afterClose.subscribe(_ => {
      // console.log(_, 'edit');
      if (_) {
        this.refresh.emit();
      }
    });
  }
  deleteCancel(): void {
    this.messageService.info('取消删除');
  }
  deleteSelectByID(): void {
    const idSet = this.setOfCheckedId;
    const ids = Array.from(idSet);
    if (ids.length === 0) {
      this.messageService.info('未选择要删除的');
      return;
    }
    ids.forEach(ID => {
      this.baseRepository.delete(this.resourceUrl, {ID}).subscribe(res => {
        console.log(res, 'delete');
        this.setOfCheckedId.delete(ID);
        this.refresh.emit();
      }, err => this.messageService.error(err.error));
    });
  }
}
