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
    // this.questions = [
    //   {
    //     value: null,
    //     id: 'ID',
    //     Description: 'ID',
    //     must: false,
    //     inputType: 'input',
    //     Nillable: true,
    //     Optional: true,
    //     Type: 'string',
    //     Immutable: false,
    //     validation: '',
    //     options: [],
    //     isEnum: false,
    //     Properties: null,
    //   },
    //   {
    //     value: null,
    //     id: 'DingTalkUserID',
    //     Description: '钉用户id',
    //     must: false,
    //     inputType: 'input',
    //     Nillable: true,
    //     Optional: true,
    //     Type: 'string',
    //     Immutable: false,
    //     validation: '',
    //     options: [],
    //     isEnum: false,
    //     Properties: null,
    //   },
    //   {
    //     value: null,
    //     id: 'Mail',
    //     Description: '邮箱',
    //     must: false,
    //     inputType: 'input',
    //     Nillable: true,
    //     Optional: true,
    //     Type: 'string',
    //     Immutable: false,
    //     validation: '',
    //     options: [],
    //     isEnum: false,
    //     Properties: null,
    //   },
    //   {
    //     value: null,
    //     id: 'Mobile',
    //     Description: '电话',
    //     must: false,
    //     inputType: 'input',
    //     Nillable: true,
    //     Optional: true,
    //     Type: 'string',
    //     Immutable: false,
    //     validation: '',
    //     options: [],
    //     isEnum: false,
    //     Properties: null,
    //   },
    //   {
    //     value: null,
    //     id: 'ParentID',
    //     Description: '上级',
    //     must: false,
    //     inputType: 'select',
    //     Nillable: true,
    //     Optional: true,
    //     Type: 'string',
    //     Immutable: false,
    //     validation: '',
    //     options: [],
    //     isEnum: false,
    //     Properties: null,
    //   },
    //   {
    //     value: null,
    //     id: 'Password',
    //     Description: '密码',
    //     must: false,
    //     inputType: 'input',
    //     Nillable: true,
    //     Optional: true,
    //     Type: 'string',
    //     validation: '',
    //     Immutable: false,
    //     options: [],
    //     isEnum: false,
    //     Properties: null,
    //   },
    //   {
    //     value: null,
    //     id: 'RealName',
    //     Description: '名字',
    //     must: false,
    //     inputType: 'input',
    //     Nillable: true,
    //     Optional: true,
    //     Type: 'string',
    //     validation: '',
    //     Immutable: false,
    //     options: [],
    //     isEnum: false,
    //     Properties: null,
    //   },
    //   {
    //     value: null,
    //     id: 'State',
    //     Description: '状态',
    //     must: true,
    //     inputType: 'input',
    //     Nillable: true,
    //     Optional: true,
    //     Type: 'string',
    //     validation: '',
    //     Immutable: false,
    //     options: [],
    //     isEnum: false,
    //     Properties: null,
    //   },
    //   {
    //     value: null,
    //     id: 'Username',
    //     Description: '用户名',
    //     must: true,
    //     inputType: 'input',
    //     Nillable: true,
    //     Optional: true,
    //     Type: 'string',
    //     validation: '',
    //     Immutable: false,
    //     options: [],
    //     isEnum: false,
    //     Properties: null,
    //   },
    // ];
    // this.editForm = this.questionServices.toFormGroup(this.questions);

    // if (this.mode === 'edit') {
    //   // 查关联
    //   this.baseRepository.queryById('User',
    //     {
    //       ID: this.data.ID,
    //       WithParent: true,
    //     }).subscribe(res => {
    //     if (res.Parent) {
    //       this.editForm.get('ParentID').setValue(res.Parent.ID);
    //     }
    //   });
    // }
    // this.editForm.patchValue({...this.data});

    // this.baseRepository.queryPage('User', {}).subscribe(res => {
    //   this.selectList = res;
    // });

    this.baseRepository.getModel(this.resourceUrl).subscribe(res => {
      this.modeTitle = res.Description;

      console.log(res, 'res');
      const arr = Object.keys(res.Properties).map(key => ({id: key, ...res.Properties[key],
        isEnum: res.Properties[key].hasOwnProperty('Enum')}));
      // 后端返回ID后不需要用unshift添加
      arr.unshift({id: 'ID', Type: 'integer', Nillable: true, });
      const edit = this.questionServices.toTextFormGroup(arr);
      this.loopCommon(arr);

      this.questions = arr;
      this.editForm = edit;
      if (this.mode === 'edit') {
        // 查关联
        this.baseRepository.queryById(this.resourceUrl,
          {
            ID: this.data.ID,
          }).subscribe(e => {
            console.log(e, 'eee');
            this.editForm.patchValue({...e});
        });
      }

      console.log(this.editForm, 'model editForm', this.editForm.get('InstanceTemplate'));
      console.log(this.questions, 'questions');
    });
  }

  loopCommon(arr): any {
    arr.forEach(obj => {
      if (obj.Type === 'object' && obj.Properties) {
        const loop = Object.keys(obj.Properties).map(key => ({id: key, ...obj.Properties[key],
          isEnum: obj.Properties[key].hasOwnProperty('Enum')}));
        // 后端返回ID后不需要用unshift添加
        loop.unshift({id: 'ID', Type: 'integer', Nillable: true, });
        const loopEdit = this.questionServices.toTextFormGroup(loop);
        obj.Properties = loop;
        // 不需要将表单放入 editForm里面创建了group的 是group的 this.editForm.get(obj.id)获取 值会一一绑定对应
        console.log(this.editForm.get(obj.id), obj.id, 'obj', loopEdit);
        // obj.editForm = loopEdit;
        this.loopCommon(loop);
      }
    });
  }

  onClose(): void {
    this.modalRef.close();
  }
  onSubmit(): void {
    const value = {...this.editForm.value};
    (this.mode === 'edit' ? this.baseRepository.update(this.resourceUrl, value) :
      this.baseRepository.add(this.resourceUrl, value)).subscribe(res => {
        this.modalRef.close(res);
        this.messageService.success(this.mode === 'edit' ? '修改成功' : '新增成功');
    }, err => this.messageService.error(err));
  }
}

