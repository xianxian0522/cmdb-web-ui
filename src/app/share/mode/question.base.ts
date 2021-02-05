export class QuestionBase<T> {
  value: T;
  id: string;
  name: string;
  must: boolean;
  inputType: string;
  type: string;
  validation: string;
  options: {key: string, value: string}[];

  constructor(options: {
    value?: T;
    id?: string;
    name?: string;
    must?: boolean;
    inputType?: string;
    type?: string;
    validation?: string;
    options?: {key: string, value: string}[];
  } = {}) {
    this.value = options.value;
    this.id = options.id || '';
    this.name = options.name || '';
    this.must = !!options.must;
    this.inputType = options.inputType || '';
    this.type = options.type || '';
    this.validation = options.validation || '';
    this.options = options.options || [];
  }
}

export class SearchBase<T> {
  id: string;
  column: string;

  constructor(options: {
    id?: string;
    column?: string;
  } = {}) {
    this.id = options.id || '';
    this.column = options.column || '';
  }
}
