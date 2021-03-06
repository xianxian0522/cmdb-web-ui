import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private router: Router) {}

  getAuthorizationToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const authorizationToken = `Bearer ${token}`;
      return authorizationToken;
    } else {
      this.router.navigateByUrl('/login');
      return '';
    }
  }
}
