import { Component, OnInit } from '@angular/core';
import {MenuItem, MenuItems} from '../menu';
import {Location} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {BaseRepository} from '../services/base.repository';

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
  ) { }

  isCollapsed = false;
  section: string;
  sections: MenuItem[];
  sectionItem: MenuItem[];
  baseTitle: string;

  ngOnInit(): void {
    this.sections = this.menuItems.getAllSections();
    const url = this.location.path();
    console.log(url, location.pathname);
    this.section = url.split('/')[1];

    this.baseTitle = url.split('/')[2];

    if (this.section === 'resources') {
      this.baseRepository.getAllModel().subscribe(res => {
        this.sectionItem = Object.keys(res).map(key => ({
          id: key,
          name: res[key].Description,
          icon: '',
        }));
        this.titleCommon(url);
      });
    } else {
      this.sectionItem = this.menuItems.getItems(this.section);
      this.titleCommon(url);
    }

    this.location.onUrlChange(r => {
      this.baseTitle = r.split('/')[2];
      this.titleCommon(r);
    });
  }

  titleCommon(url): void {
    const titleName = this.sectionItem.filter(v => v.id === url.split('/')[2]).map(n => n.name)[0];
    this.title.setTitle(this.section.toUpperCase() + '-' + titleName);
  }
}
