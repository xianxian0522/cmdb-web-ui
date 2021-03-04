import {Component, Input, OnInit} from '@angular/core';
import {FormArray} from '@angular/forms';

@Component({
  selector: '[app-common-form]',
  templateUrl: './common-form.component.html',
  styleUrls: ['./common-form.component.scss']
})
export class CommonFormComponent implements OnInit {

  constructor() { }

  @Input() editForm;
  @Input() questions;
  @Input() selectList;
  @Input() mode;

  ngOnInit(): void {
  }

  getFormArray(id, question): FormArray {
    // console.log(this.editForm.get(id), 'edit id', question);
    return this.editForm.get(id) as FormArray;
  }
  // 多选择的时候 搜索的选择
  filterOption(inputValue: string, item: any): boolean {
    return item.title.indexOf(inputValue) > -1;
  }
  search(ret: {}): void {
    console.log('nzSearchChangexx', ret);
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}, list): void {
    console.log('nzChange', ret, list);
  }
}
