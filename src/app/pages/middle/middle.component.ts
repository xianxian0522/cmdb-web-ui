import {Component, OnInit} from '@angular/core';
import {BaseRepository} from '../../share/services/base.repository';
import {Router} from '@angular/router';
import {ResourcesCommonComponent} from '../resources/resources-common/resources-common.component';

@Component({
  selector: 'app-login-oauth',
  templateUrl: './middle.component.html',
  styleUrls: ['./middle.component.scss']
})
export class MiddleComponent implements OnInit {

  constructor(
    private baseRepository: BaseRepository<any>,
    private router: Router,
  ) { }

  routes;

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.baseRepository.token().subscribe(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/resources/AppMember');
        }
        // this.baseRepository.getAllModel().subscribe(data => {
        //   this.routes = Object.keys(data).map(r => ({path: r, component: ResourcesCommonComponent}));
        //   console.log(this.routes);
        // });
      });
    } else {
      this.router.navigateByUrl('/resources/AppMember');
    }
  }
}
