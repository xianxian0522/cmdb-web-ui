import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
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
  editValueType = [];
  isReturn = false;

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

      const arr = Object.keys(res.Properties).map(key => ({id: key, ...res.Properties[key],
        isEnum: res.Properties[key].hasOwnProperty('Enum')}));
      this.editValueType = arr;
      // 后端返回ID后不需要用unshift添加
      arr.unshift({id: 'ID', Type: 'integer', Nillable: true, });

      const edg = [];
      Object.keys(res.Edges).map(key => {
        const url = res.Edges[key].Type;
        let tags = [];
        this.baseRepository.queryPage(url, { Limit: 1000, Offset: 0}).subscribe(r => {
          if (r) {
            tags = r.map(k => ({V: k.ID, N: k.Name ? k.Name : k.Username || k.Role || k.InnerIP || k.ID}));
          }
          if (res.Edges[key].Required) {
            edg.push({
              id: res.Edges[key].Name, ...res.Edges[key],
              Enum: tags,
              // isEnum: (tags.length > 0) ? true : false,
              isEnum: true,
              isTags: !res.Edges[key].Unique,
              Description: res.Edges[key].Description || res.Edges[key].Name,
              // Type: 'integer',
            });
          } else {
            edg.push({
              Nillable: true,
              id: res.Edges[key].Name, ...res.Edges[key],
              Description: res.Edges[key].Description || res.Edges[key].Name,
              Enum: tags,
              isEnum: true,
              isTags: !res.Edges[key].Unique,
              // Type: 'integer'
            });
          }
          const s = arr.concat(edg);
          const edit = this.questionServices.toTextFormGroup(s);
          this.loopCommon(s);

          this.questions = s;
          this.editForm = edit;
          // console.log(this.editForm, 'model editForm', this.editForm.get('InstanceTemplate'));
          // console.log(this.questions, 'questions');
        });
      });

      // const edit = this.questionServices.toTextFormGroup(arr);
      // this.loopCommon(arr);
      //
      // this.questions = arr;
      // this.editForm = edit;
      const withTrue = {};
      Object.keys(res.Edges).map(key => {
        withTrue[`With${key}`] = true;
      });
      if (this.mode === 'edit') {
        // 查关联
        this.baseRepository.queryById(this.resourceUrl,
          {
            ID: this.data.ID,
            ...withTrue,
          }).subscribe(e => {
            Object.keys(res.Edges).map(key => {
              // console.log(key, e[key], 'key');
              if (key.slice(-1) === 's' && key !== 'Vcs') {
                e[`${key.slice(0, -1)}IDs`] = (e[key] && e[key].length > 0) ? e[key].map(ids => ids.ID) : [];
              } else if (key === 'Children') {
                e[`${key.slice(0, 5)}IDs`] = (e[key] && e[key].length > 0) ? e[key].map(ids => ids.ID) : [];
              } else {
                e[`${key}ID`] = e[key] ? e[key].ID : null;
                // console.log('duix 查询出的字段Parent、Children 对应editForm字段是ParentID、ChildIDs', key, e);
              }
            });
            // e.InstanceTemplate.BindInfos = e.InstanceTemplate.BindInfos ? e.InstanceTemplate.BindInfos : [];
            // e.InstanceTemplate.EnvVars = e.InstanceTemplate.EnvVars ? e.InstanceTemplate.EnvVars : [];
            Object.keys(e).map(k => {
              if (Object.prototype.toString.call(e[k]) === '[object Object]') {
                e[k] = JSON.stringify(e[k]);
              }
            });
            this.editForm.patchValue({...e});
            // console.log(e, this.editForm.value, 'wm');
        });
      }
    });
  }

  loopCommon(arr): any {
    arr.forEach(obj => {
      if (obj.Type === 'object') {
        if (obj.Properties) {
          const loop = Object.keys(obj.Properties).map(key => ({id: key, ...obj.Properties[key],
            isEnum: obj.Properties[key].hasOwnProperty('Enum')}));
          // // 后端返回ID后不需要用unshift添加
          // loop.unshift({id: 'ID', Type: 'integer', Nillable: true, });
          const loopEdit = this.questionServices.toTextFormGroup(loop);
          obj.Properties = loop;
          // 不需要将表单放入 editForm里面创建了group的 是group的 this.editForm.get(obj.id)获取 值会一一绑定对应
          // console.log(this.editForm.get(obj.id), obj.id, 'obj', loopEdit);
          // obj.editForm = loopEdit;
          this.loopCommon(loop);
        } else {
          obj.Type = 'object-textarea';
          // console.log(obj, '需要json.parse传给后端 必须是json对象');
        }
      } else if (obj.Type === 'array' && obj.Items.Properties) {
        const loop = Object.keys(obj.Items.Properties).map(key => ({id: key, ...obj.Items.Properties[key],
          isEnum: obj.Items.Properties[key].hasOwnProperty('Enum')}));
        // 后端返回ID后不需要用unshift添加
        // loop.unshift({id: 'ID', Type: 'integer', Nillable: true, });
        const loopEdit = this.questionServices.toTextFormGroup(loop);
        obj.Items.Properties = loop;
        // 不需要将表单放入 editForm里面创建了group的 是group的 this.editForm.get(obj.id)获取 值会一一绑定对应
        // console.log( obj.id, 'obj', loopEdit);
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
    this.editValueType.map(key => {
      if (key.Type === 'bytes') {
        // 编码
        value[key.id] = this.encode(value[key.id]);
      }
      if (key.Type === 'object-textarea') {
        const obj = value[key.id];
        if (obj && this.isJSONTest(obj)) {
          // 转json对象
          value[key.id] = JSON.parse(value[key.id]);
          console.log(value[key.id], 'object-text');
        }
      }
    });
    if (this.isReturn) {
      this.messageService.info(`输入的格式不正确`);
      return;
    }
    (this.mode === 'edit' ? this.baseRepository.update(this.resourceUrl, value) :
      this.baseRepository.add(this.resourceUrl, value)).subscribe(res => {
        this.modalRef.close(res);
        this.messageService.success(this.mode === 'edit' ? '修改成功' : '新增成功');
    }, err => this.messageService.error(err));
  }
  // 字符串转base64
  encode(str: string): string{
    // 对字符串进行编码
    const code = encodeURI(str);
    // 对编码的字符串转化base64
    return btoa(code);
  }
  isJSONTest(str): boolean {
    try {
      const obj = JSON.parse(str);
      this.isReturn = false;
      // console.log('转换成功：' + obj);
      return true;
    } catch (e) {
      this.isReturn = true;
      // console.log('error：' + str + '!!!' + e);
      return false;
    }
  }
}

