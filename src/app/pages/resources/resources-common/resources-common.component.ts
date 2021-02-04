import {Component, OnInit, EventEmitter, Output, ViewChild, AfterViewInit} from '@angular/core';
import {BaseRepository} from '../../../share/services/base.repository';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {merge} from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-menu1',
  templateUrl: './resources-common.component.html',
  styleUrls: ['./resources-common.component.scss']
})
export class ResourcesCommonComponent implements OnInit, AfterViewInit {

  constructor(
      private baseRepository: BaseRepository<any>,
      private fb: FormBuilder,
  ) { }

  searchForm: FormGroup = this.fb.group({});
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
    this.checked = data.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = data.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }
  onAllChecked(checked: boolean): void {
    this.data.forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    merge(this.refresh, this.table.nzPageIndexChange, this.table.nzPageSizeChange, this.searchForm.valueChanges)
      .pipe(
        debounceTime(200),
        switchMap(() => {
          this.isLoadingResults = true;
          const obj = {
            Limit: this.table.nzPageSize,
            Offset: (this.table.nzPageIndex - 1) * this.table.nzPageSize,
            ...this.searchForm.value
          };
          return this.baseRepository.queryPage('User', obj);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.total = data && data.length ? data.length : 0;
          return data;
        })
      ).subscribe(res => {
        this.data = res ? res : [];
        console.log(this.data, this.total);
    });
    this.refresh.emit();
  }

  showCreateDialog(): void {

  }
  showEditDialog(ele): void {

  }
  deleteCancel(): void {

  }
  deleteSelectByID(): void {

  }
}
