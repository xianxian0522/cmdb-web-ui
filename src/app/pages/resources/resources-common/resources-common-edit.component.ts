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
  beforeModifyData: any;

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
      Object.keys(res.Properties).map((key, index) => {
        if (res.Properties[key].Type === 'bytes') {
          arr.splice(index + 2, 0, {
            id: key + 'Bool',
            Type: 'bytes-bool',
            Description: res.Properties[key].Description + '是否转码'
          });
        }
      });

      const edg = [];
      Object.keys(res.Edges).map(key => {
        const url = res.Edges[key].Type;
        let tags = [];
        this.baseRepository.queryPage(url, {}).subscribe(r => {
          if (r) {
            tags = r.map(k => ({
              V: k.ID,
              N: k.Name ? k.Name : k.Username || k.Role || k.InnerIP || k.ID,
              title: k.Name ? k.Name : k.Username || k.Role || k.InnerIP || k.ID,
            }));
          }
          if (res.Edges[key].Required) {
            edg.push({
              id: res.Edges[key].Name, ...res.Edges[key],
              Enum: tags,
              // isEnum: (tags.length > 0) ? true : false,
              isEnum: true,
              isTags: !res.Edges[key].Unique,
              Description: res.Edges[key].Description || res.Edges[key].Name,
            });
          } else {
            edg.push({
              Nillable: true,
              id: res.Edges[key].Name, ...res.Edges[key],
              Description: res.Edges[key].Description || res.Edges[key].Name,
              Enum: tags,
              isEnum: true,
              isTags: !res.Edges[key].Unique,
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
              if (key === 'Repositories') {
                e[`${key.slice(0, -3)}yIDs`] = (e[key] && e[key].length > 0) ? e[key].map(ids => ids.ID) : [];
              }
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
            this.editValueType.map(k => {
              // 类型是object 里面是json格式自己输入的 需要转
              if (k.Type === 'object-textarea' && e[k.id]) {
                // console.log(k.id, 'iddd');
                e[k.id] = JSON.stringify(e[k.id]);
              }
              // 是数组类型的需要增加表单
              if (k.Type === 'array' || k.Type === 'object') {
                // console.log(k.id, 'array', k, e[k.id]);
                this.editAddArrayForm(k, e[k.id]);
              }
              // if (k.Type === 'bytes') {
              //   // 解码
              //   e[k.id] = this.decode(e[k.id]);
              // }
            });
            // Object.keys(e).map(k => {
            //  通过判断是否是对象类型 会把对象有的属性也转掉了 没一一对应的值
            //   console.log(k, e, 'xxx');
            //   if (Object.prototype.toString.call(e[k]) === '[object Object]') {
            //     e[k] = JSON.stringify(e[k]);
            //   }
            // });
            setTimeout(() => this.editForm.patchValue({...e}), 10);
            // this.editForm.patchValue({...e});
            this.beforeModifyData = e;
            // console.log(e, this.editForm.value, 'wm');
        });
      }
    });
  }

  editAddArrayForm(arr, e): any {
    if (arr instanceof Array) {
      arr.map(key => {
        if (key.Type === 'array') {
          if (e[key.id].length > 1) {
            key.arrItems = [];
            e[key.id].forEach(k => {
              // console.log(this.editForm.value, 'kkkkk', k, key.id);
              key.arrItems.push({...key.Items});
            });
            // 新增表单
            this.addForm(this.editForm, e);
          }
        }
        if (key.Type === 'object') {
          this.editAddArrayForm(key.Properties, e);
        }
      });
    } else {
      this.editAddArrayForm(arr.Properties, e);
    }
  }
  addForm(editForm, edit, key?): any {
    const obj = editForm;
    if (obj.value instanceof Array) {
      if (edit[key].length > 1) {
        const base = obj.value[0];
        // 先清除表单再添加
        obj.clear();
        edit[key].forEach(_ => {
          console.log(base, obj, 'add');
          const baseGroup = new FormGroup({});
          Object.keys(base).forEach(b => {
            baseGroup.addControl(b, new FormControl(null));
          });
          obj.push(baseGroup);
        });
      }
    } else {
      Object.keys(obj.value).map(k => {
        if (obj.get(k).value) {
          this.addForm(obj.get(k), edit, k);
        }
      });
    }
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
        obj.arrItems = [{...obj.Items}];
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
      if (key.Type === 'bytes-bool' && value[key.id]) {
        // 编码
        // console.log('password', value[key.id], value[key.id.slice(0, -4)], key.id.slice(0, -4));
        value[key.id.slice(0, -4)] = this.encode(value[key.id.slice(0, -4)]);
      }
      if (key.Type === 'object-textarea') {
        const obj = value[key.id];
        if (obj === '') {
          value[key.id] = null;
          this.isReturn = false;
        }
        // 输入类型是必须是json格式
        if (obj && this.isJSONTest(obj)) {
          // 将json格式的字符 转换后的类型只能是对象形式的才行
          value[key.id] = JSON.parse(value[key.id]);
          if (Object.prototype.toString.call(value[key.id]) === '[object Object]') {
            this.isReturn = false;
          } else {
            this.isReturn = true;
          }
          // console.log(value[key.id], 'object-text');
        }
      }
    });
    if (this.isReturn) {
      this.messageService.info(`输入的格式不正确`);
      return;
    }
    if (this.mode === 'edit') {
      Object.keys(value).map(key => {
        if (value[key] === null) {
          // 修改的时候如果内容为null了 就是删除这个字段的内容 需要添加请求参数
          if (key.slice(-2) === 'ID') {
            value['Clear' + key.slice(0, -2)] = true;
          } else {
            value['Clear' + key] = true;
          }
          console.log(value, key, 'zzz');
        }
        if (key !== 'ID' && key.slice(-2) === 'ID') {
          // 根原始值一样 删掉这个属性
          if (value[key] === this.beforeModifyData[key]) {
            delete value[key];
            // console.log(value[key], this.beforeModifyData[key], 'value select');
          }
          // console.log(value[key], this.beforeModifyData[key], 'delete before');
        }
      });

      Object.keys(this.beforeModifyData).map(key => {
        if (key.slice(-3) === 'IDs') {
          // console.log(key, this.beforeModifyData[key], value[key]);
          value['Remove' + key] = [];
          value['Add' + key] = [];
          this.beforeModifyData[key] = this.beforeModifyData[key] ? this.beforeModifyData[key] : [];
          value[key]  = value[key] ? value[key] : [];
          this.beforeModifyData[key].map(beforeID => {
            // 新值不含原值 移除这个id
            if (!value[key].includes(beforeID)) {
              value['Remove' + key].push(beforeID);
              // console.log(value[key].includes(beforeID), 'zhiq');
            }
          });
          value[key].map(nowID => {
            // 原值不包含新增 增加这个id
            if (!this.beforeModifyData[key].includes(nowID)) {
              value['Add' + key].push(nowID);
            }
          });
          // console.log(value, 'submit');
        }
      });
    }
    (this.mode === 'edit' ? this.baseRepository.update(this.resourceUrl, value) :
      this.baseRepository.add(this.resourceUrl, value)).subscribe(res => {
        this.modalRef.close(res);
        this.messageService.success(this.mode === 'edit' ? '修改成功' : '新增成功');
    }, err => {
      this.messageService.error(err.error);
      // console.log(err);
    });
  }
  // 字符串转base64
  encode(str: string): string{
    // 对字符串进行编码
    const code = encodeURI(str);
    // 对编码的字符串转化base64
    return btoa(code);
  }
  // base64转字符串
  decode(base64): string{
    // 对base64转编码
    const decode = atob(base64);
    // 编码转字符串
    return  decodeURI(decode);
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

