import {Injectable} from '@angular/core';

export interface MenuItem {
  id: string;
  name: string;
  icon: string;
}

const RESOURCES = 'resources';
const MODEL = 'model';
const MENUS: {[key: string]: MenuItem[]} = {
  [RESOURCES]: [
    {
      id: 'appMember',
      name: 'appMember',
      icon: '',
    },
    {
      id: 'app',
      name: 'app',
      icon: '',
    },
    {
      id: 'bizMember',
      name: 'bizMember',
      icon: '',
    },
    {
      id: 'biz',
      name: 'biz',
      icon: '',
    },
    {
      id: 'cluster',
      name: 'cluster',
      icon: '',
    },
    {
      id: 'env',
      name: 'env',
      icon: '',
    },
    {
      id: 'host',
      name: 'host',
      icon: '',
    },
    {
      id: 'idc',
      name: 'idc',
      icon: '',
    },
    {
      id: 'instance',
      name: 'instance',
      icon: '',
    },
    {
      id: 'logicIdcEnv',
      name: 'logicIdcEnv',
      icon: '',
    },
    {
      id: 'logicIdc',
      name: 'logicIdc',
      icon: '',
    },
    {
      id: 'programmingLanguage',
      name: 'programmingLanguage',
      icon: '',
    },
    {
      id: 'replicaSetMember',
      name: 'replicaSetMember',
      icon: '',
    },
    {
      id: 'replicaSet',
      name: 'replicaSet',
      icon: '',
    },
    {
      id: 'repository',
      name: 'repository',
      icon: '',
    },
    {
      id: 'user',
      name: 'user',
      icon: '',
    },
    {
      id: 'vcs',
      name: 'vcs',
      icon: '',
    },
  ],
  [MODEL]: [
    {
      id: 'graph',
      name: '关联图',
      icon: 'menu',
    },
    {
      id: 'menu22',
      name: '菜单22',
      icon: 'menu',
    }
  ],
};
const ALL_RESOURCES = MENUS[RESOURCES];
const ALL_MODEL = MENUS[MODEL];
const ALL_SECTIONS: MenuItem[] = [
  {
    id: RESOURCES,
    name: '资源',
    icon: '',
  },
  {
    id: MODEL,
    name: '模型',
    icon: '',
  }
];

@Injectable({
  providedIn: 'root'
})
export class MenuItems {
  getAllSections(): MenuItem[] {
    return ALL_SECTIONS;
  }

  getItems(section: string): MenuItem[]{
    if (section === RESOURCES) {
      return ALL_RESOURCES;
    }
    if (section === MODEL) {
      return ALL_MODEL;
    }
    return [];
  }
}
