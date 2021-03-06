import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

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
  @Input() layoutType;
  @Input() span;

  ngOnInit(): void {
  }

  getFormArray(id, question): FormArray {
    // console.log(this.editForm.get(id), 'edit id', question);
    // if (question.arrItems.length > 1) {
    //   const arr = question.arrItems;
    //   console.log(arr, question.arrItems, ';;;;;');
    //   arr.forEach(_ => {
    //     const base = this.editForm.get(id).value[0];
    //     const baseGroup = new FormGroup({});
    //     Object.keys(base).forEach(b => {
    //       baseGroup.addControl(b, new FormControl(null));
    //     });
    //     (this.editForm.get(id) as FormArray).push(baseGroup);
    //   });
    // }
    return this.editForm.get(id) as FormArray;
  }
  addItems(id, question): void {
    question.arrItems.push({...question.Items});
    // const base = this.editForm.get(id).value?.[0];
    const base = question.Items.Properties.map(k => k.id);
    const baseGroup = new FormGroup({});
    base.forEach(b => {
      baseGroup.addControl(b, new FormControl(null));
    });
    (this.editForm.get(id) as FormArray).push(baseGroup);
    // this.getFormArray(id, question).push(baseGroup);
    // console.log('xxx;;;;', id, question, this.editForm.get(id), base);
  }
  deleteItem(id, question, index: number): void {
    if (question.arrItems.length > 1) {
      question.arrItems.splice(index, 1);
      (this.editForm.get(id) as FormArray).removeAt(index);
    }
    // this.getFormArray(id, question).removeAt(index);
    // console.log(id, question, index, this.editForm.get(id));
  }
  isNotSelected(tags, select: string): boolean {
    return this.editForm.get(tags).value?.indexOf(select) === -1;
  }

  // ????????? ?????????????????? ??????????????????true??????
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
