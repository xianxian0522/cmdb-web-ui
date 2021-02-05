import {Injectable} from '@angular/core';
import {QuestionBase, SearchBase} from '../mode/question.base';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
      group[question.id] = question.Nillable || question.Optional ? new FormControl(question.value || null) :
        new FormControl(question.value || null, [Validators.required]);
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
