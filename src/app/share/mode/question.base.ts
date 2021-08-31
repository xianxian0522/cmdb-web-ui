export class QuestionBase<T> {
  value: T;
  id: string;
  Description: string;
  isTags: boolean;
  inputType: string;
  validation: string;
  Nillable: boolean;
  Optional: boolean;
  Type: string;
  Immutable: boolean;
  isEnum: boolean;
  options: {};
  Properties: any;
  Items: any;
  arrItems: any;
  Enum: any;
  disabled: boolean;

  constructor(options: {
    value?: T;
    id?: string;
    Description?: string;
    isTags?: boolean;
    inputType?: string;
    Nillable?: boolean;
    Optional?: boolean;
    Type?: string;
    Immutable?: boolean;
    isEnum?: boolean;
    validation?: string;
    options?: {key: string, value: string}[];
    Properties?: QuestionBase<T>;
    Items?: QuestionBase<T>;
    arrItems?: any;
    Enum?: any;
    disabled?: boolean;
  } = {}) {
    this.value = options.value;
    this.id = options.id || '';
    this.Description = options.Description || options.id;
    this.isTags = !!options.isTags;
    this.Nillable = !!options.Nillable;
    this.Optional = !!options.Optional;
    this.isEnum = !!options.isEnum;
    this.inputType = options.inputType || '';
    this.Type = options.Type || 'string';
    this.Immutable = !!options.Immutable;
    this.validation = options.validation || '';
    this.options = options.options || {};
    this.Properties = options.Properties || null;
    this.Items = options.Items || [];
    this.arrItems = options.arrItems || [];
    this.Enum = options.Enum || [];
    this.disabled = !!options.disabled;
  }
}

export class QuestionEdgBase<T> {
  Description: string;
  Inverse: boolean;
  Name: string;
  Ref: string;
  Required: boolean;
  Type: string;
  Unique: boolean;

  constructor(options: {
    Description?: string;
    Inverse?: boolean;
    Name?: string;
    Ref?: string;
    Required?: boolean;
    Type?: string;
    Unique?: boolean;
  } = {}) {
    this.Description = options.Description || options.Name;
    this.Inverse = !!options.Inverse;
    this.Name = options.Name;
    this.Ref = options.Ref || '';
    this.Required = !!options.Required;
    this.Type = options.Type;
    this.Unique = options.Unique;
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
