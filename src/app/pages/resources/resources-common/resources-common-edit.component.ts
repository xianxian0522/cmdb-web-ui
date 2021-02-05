import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {QuestionBase} from '../../../share/mode/question.base';
import {QuestionServices} from '../../../share/services/question.services';
import {BaseRepository} from '../../../share/services/base.repository';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalRef} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-resources-common-edit',
  templateUrl: './resources-common-edit.component.html',
  styleUrls: ['./resources-common-edit.component.scss']
})
export class ResourcesCommonEditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private questionServices: QuestionServices,
    private baseRepository: BaseRepository<any>,
    private messageService: NzMessageService,
    private modalRef: NzModalRef,
  ) { }

  @Input() mode;
  @Input() resourceUrl;
  @Input() data;
  modeTitle: string;
  editForm: FormGroup = this.fb.group({});
  questions: QuestionBase<string>[];
  selectList = [];

  ngOnInit(): void {
    this.questions = [
      {
        value: null,
        id: 'ID',
        Description: 'ID',
        must: false,
        inputType: 'input',
        Nillable: true,
        Optional: true,
        Type: 'string',
        Immutable: false,
        validation: '',
        options: [],
        isEnum: false,
      },
      {
        value: null,
        id: 'DingTalkUserID',
        Description: '钉用户id',
        must: false,
        inputType: 'input',
        Nillable: true,
        Optional: true,
        Type: 'string',
        Immutable: false,
        validation: '',
        options: [],
        isEnum: false,
      },
      {
        value: null,
        id: 'Mail',
        Description: '邮箱',
        must: false,
        inputType: 'input',
        Nillable: true,
        Optional: true,
        Type: 'string',
        Immutable: false,
        validation: '',
        options: [],
        isEnum: false,
      },
      {
        value: null,
        id: 'Mobile',
        Description: '电话',
        must: false,
        inputType: 'input',
        Nillable: true,
        Optional: true,
        Type: 'string',
        Immutable: false,
        validation: '',
        options: [],
        isEnum: false,
      },
      {
        value: null,
        id: 'ParentID',
        Description: '上级',
        must: false,
        inputType: 'select',
        Nillable: true,
        Optional: true,
        Type: 'string',
        Immutable: false,
        validation: '',
        options: [],
        isEnum: false,
      },
      {
        value: null,
        id: 'Password',
        Description: '密码',
        must: false,
        inputType: 'input',
        Nillable: true,
        Optional: true,
        Type: 'string',
        validation: '',
        Immutable: false,
        options: [],
        isEnum: false,
      },
      {
        value: null,
        id: 'RealName',
        Description: '名字',
        must: false,
        inputType: 'input',
        Nillable: true,
        Optional: true,
        Type: 'string',
        validation: '',
        Immutable: false,
        options: [],
        isEnum: false,
      },
      {
        value: null,
        id: 'State',
        Description: '状态',
        must: true,
        inputType: 'input',
        Nillable: true,
        Optional: true,
        Type: 'string',
        validation: '',
        Immutable: false,
        options: [],
        isEnum: false,
      },
      {
        value: null,
        id: 'Username',
        Description: '用户名',
        must: true,
        inputType: 'input',
        Nillable: true,
        Optional: true,
        Type: 'string',
        validation: '',
        Immutable: false,
        options: [],
        isEnum: false,
      },
    ];
    this.editForm = this.questionServices.toFormGroup(this.questions);

    if (this.mode === 'edit') {
      // 查关联
      this.baseRepository.queryById('User',
        {
          ID: this.data.ID,
          WithParent: true,
        }).subscribe(res => {
        if (res.Parent) {
          this.editForm.get('ParentID').setValue(res.Parent.ID);
        }
      });
    }
    this.editForm.patchValue({...this.data});

    this.baseRepository.queryPage('User', {}).subscribe(res => {
      this.selectList = res;
    });

    this.baseRepository.getModel(this.resourceUrl).subscribe(res => {
      this.modeTitle = res.Description;
      console.log(res);
      const arr = Object.keys(res.Properties).map(key => ({id: key, ...res.Properties[key],
        isEnum: res.Properties.hasOwnProperty('Enum')}));
      const edit = this.questionServices.toTextFormGroup(arr);
      this.questions = arr;
      this.editForm = edit;
      console.log(edit, 'model editForm');
      console.log(this.questions, 'questions');
    });
  }

  onClose(): void {
    this.modalRef.close();
  }
  onSubmit(): void {
    const value = {...this.editForm.value};
    console.log(value);
    (this.mode === 'edit' ? this.baseRepository.update(this.resourceUrl, value) :
      this.baseRepository.add(this.resourceUrl, value)).subscribe(res => {
        this.modalRef.close(res);
        this.messageService.success(this.mode === 'edit' ? '修改成功' : '新增成功');
    }, err => this.messageService.error(err));
  }
}

