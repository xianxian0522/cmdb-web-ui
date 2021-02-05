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
    this.modeTitle = this.resourceUrl;
    this.questions = [
      {
        value: null,
        id: 'ID',
        name: 'ID',
        must: false,
        inputType: 'input',
        type: '',
        validation: '',
        options: [],
      },
      {
        value: null,
        id: 'DingTalkUserID',
        name: '钉用户id',
        must: false,
        inputType: 'input',
        type: '',
        validation: '',
        options: [],
      },
      {
        value: null,
        id: 'Mail',
        name: '邮箱',
        must: false,
        inputType: 'input',
        type: '',
        validation: '',
        options: []
      },
      {
        value: null,
        id: 'Mobile',
        name: '电话',
        must: false,
        inputType: 'input',
        type: '',
        validation: '',
        options: []
      },
      {
        value: null,
        id: 'ParentID',
        name: '上级',
        must: false,
        inputType: 'select',
        type: '',
        validation: '',
        options: [],
      },
      {
        value: null,
        id: 'Password',
        name: '密码',
        must: false,
        inputType: 'input',
        type: '',
        validation: '',
        options: [],
      },
      {
        value: null,
        id: 'RealName',
        name: '名字',
        must: false,
        inputType: 'input',
        type: '',
        validation: '',
        options: [],
      },
      {
        value: null,
        id: 'State',
        name: '状态',
        must: true,
        inputType: 'input',
        type: '',
        validation: '',
        options: [],
      },
      {
        value: null,
        id: 'Username',
        name: '用户名',
        must: true,
        inputType: 'input',
        type: '',
        validation: '',
        options: [],
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
      console.log(res);
      this.selectList = res;
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

