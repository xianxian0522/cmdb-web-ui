import {Component, OnInit} from '@angular/core';
import {BaseRepository} from '../../share/services/base.repository';
import {Router} from '@angular/router';

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

  ngOnInit(): void {
    this.baseRepository.token().subscribe(res => {
      localStorage.setItem('token', res.token);
      this.router.navigateByUrl('/resources/AppMember');
    });
  }

}
