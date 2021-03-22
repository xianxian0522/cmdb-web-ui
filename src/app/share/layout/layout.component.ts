import { Component, OnInit } from '@angular/core';
import {MenuItem, MenuItems} from '../menu';
import {Location} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {BaseRepository} from '../services/base.repository';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AllModelServices} from '../services/allModel.services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private menuItems: MenuItems,
    private location: Location,
    private title: Title,
    private baseRepository: BaseRepository<any>,
    private router: Router,
    private allModelServices: AllModelServices,
  ) { }

  isCollapsed = false;
  section: string;
  sections: MenuItem[];
  sectionItem: MenuItem[];
  baseTitle: string;
  helper = new JwtHelperService();
  username = '';
  baseRoutePath;

  ngOnInit(): void {
    this.sections = this.menuItems.getAllSections();
    const url = this.location.path();
    console.log(url, location.pathname, 'url');

    try {
      const user = this.helper.decodeToken(localStorage.getItem('token'));
      this.username = user.name as string || user.username as string;
    }catch (e) {
      console.log(e);
    }

    this.section = url.split('/')[1];

    this.baseTitle = url.split('/')[2];

    if (this.section === 'resources') {
      this.allModelServices.arr().then(res => {
        this.sectionItem = Object.keys(res).map(key => ({
          id: key,
          name: res[key].Description,
          icon: '',
        }));
        this.baseRoutePath = Object.keys(res).map(k => k);
        this.titleCommon(url);
        this.isInstanceRoutes(this.baseTitle);
      }).catch(err => console.log(err));
    } else {
      this.sectionItem = this.menuItems.getItems(this.section);
      // console.log(this.section, this.sectionItem, 'sss');
      this.titleCommon(url);
    }

    this.location.onUrlChange(r => {
      this.baseTitle = r.split('/')[2];
      this.titleCommon(r);
      this.section = r.split('/')[1];

      if (this.section === 'resources') {
        this.isInstanceRoutes(this.baseTitle);
      }
    });
  }

  titleCommon(url): void {
    const titleName = this.sectionItem.filter(v => v.id === url.split('/')[2]).map(n => n.name)[0];
    this.title.setTitle(this.section.toUpperCase() + (titleName ? '-' + titleName : ''));
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  isInstanceRoutes(url): void {
    if (this.baseRoutePath && this.baseRoutePath.indexOf(url) === -1) {
      this.router.navigateByUrl('notFound');
    }
  }
}
