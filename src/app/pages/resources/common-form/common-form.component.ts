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
  @Input() field;

  ngOnInit(): void {
    // 先看看formArray
    console.log(this.peoples, 'ss');
  }

  get peoples(): FormArray {
    return this.editForm.get(this.field) as FormArray;
  }

}
