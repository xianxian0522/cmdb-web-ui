export class QuestionBase<T> {
  value: T;
  id: string;
  Description: string;
  must: boolean;
  inputType: string;
  validation: string;
  Nillable: boolean;
  Optional: boolean;
  Type: string;
  Immutable: boolean;
  isEnum: boolean;
  options: {};

  constructor(options: {
    value?: T;
    id?: string;
    Description?: string;
    must?: boolean;
    inputType?: string;
    Nillable?: boolean;
    Optional?: boolean;
    Type?: string;
    Immutable?: boolean;
    isEnum?: boolean;
    validation?: string;
    options?: {key: string, value: string}[];
  } = {}) {
    this.value = options.value;
    this.id = options.id || '';
    this.Description = options.Description || options.id;
    this.must = !!options.must;
    this.Nillable = !!options.Nillable;
    this.Optional = !!options.Optional;
    this.isEnum = !!options.isEnum;
    this.inputType = options.inputType || '';
    this.Type = options.Type || 'string';
    this.Immutable = !!options.Immutable;
    this.validation = options.validation || '';
    this.options = options.options || {};
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
