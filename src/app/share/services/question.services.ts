import {Injectable} from '@angular/core';
import {QuestionBase, SearchBase} from '../mode/question.base';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class QuestionServices {
  constructor() {}

  toFormGroup(questions: QuestionBase<string>[]): FormGroup {
    const group: any = {};

    questions.forEach(question => {
      group[question.id] = question.must ? new FormControl(question.value || null,
        [Validators.required]) : new FormControl(question.value || null);
    });
    return new FormGroup(group);
  }

  toTextFormGroup(questions: QuestionBase<string>[]): FormGroup {
    const group: any = {};

    questions.forEach(question => {
      if (question.Type === 'object' && question.Properties) {
        // if (question.Properties) {
          const loop = Object.keys(question.Properties).map(key => ({id: key, ...question.Properties[key],
            isEnum: question.Properties[key].hasOwnProperty('Enum'), Nillable: true}));
          // Optional和Nillable 类型array的里没有这个字段 需要后台加 后台返回ID后不需要unshift
          // loop.unshift({id: 'ID', Type: 'integer', Nillable: true, });
          group[question.id] = this.toTextFormGroup(loop);
        // } else {
        //   // group[question.id] = new FormGroup({});
        // }
      } else if (question.Type === 'array') {
        if (question.Items.Properties) {
          const loop = Object.keys(question.Items.Properties).map(key => ({id: key, ...question.Items.Properties[key],
            isEnum: question.Items.Properties[key].hasOwnProperty('Enum'), Nillable: true}));
          // Optional和Nillable 类型array的里没有这个字段 需要后台加 后台返回ID后不需要unshift
          // loop.unshift({id: 'ID', Type: 'integer', Nillable: true, });
          group[question.id] = new FormArray([this.toTextFormGroup(loop)]);
        } else {
          group[question.id] = new FormArray([]);
        }
      } else {
        group[question.id] = question.Nillable || question.Optional ? new FormControl(question.value || null) :
          new FormControl(question.value || null, [Validators.required]);
      }
      question.Description = question.Description || question.id;
    });
    return new FormGroup(group);
  }
}

@Injectable({
  providedIn: 'root'
})
export class SearchServices {
  constructor() {}

  toSearchGroup(search: SearchBase<string>[]): FormGroup {
    const group: any = {};

    search.forEach(s => {
      group[s.id] = new FormControl('' || null);
    });
    return new FormGroup(group);
  }
}
