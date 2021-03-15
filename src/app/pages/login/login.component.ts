import { Component, OnInit } from '@angular/core';
import {BaseRepository} from '../../share/services/base.repository';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private baseRepository: BaseRepository<any>,
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.baseRepository.token().subscribe(res => {
      window.location.href = res.url;
    });
  }
}
