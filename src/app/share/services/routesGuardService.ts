import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Resolve,
  Router,
  RouterStateSnapshot,
  Routes,
  UrlTree
} from '@angular/router';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ResourcesCommonComponent} from '../../pages/resources/resources-common/resources-common.component';
import { PreloadingStrategy, Route } from '@angular/router';
import {BaseRepository} from './base.repository';
import {AllModelServices} from './allModel.services';

@Injectable()
export class RoutesGuardService implements CanActivateChild, CanActivate, Resolve<any> {
  public isBecome: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  constructor(private router: Router, private allModelServices: AllModelServices) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(childRoute, state, 'state xxx');
    const url = state.url.split('/')[2];
    console.log(url, 'url route');
    return true;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(route, state, 'activate xxx');
    console.log(route.routeConfig, this.router);
    // return this.isBecome.filter(status => typeof status === 'boolean');
    return true;
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    console.log(route, state, 'resolve');
    const routes: Routes = [
      {path: 'App', component: ResourcesCommonComponent},
    ];
    return routes;
  }
}


@Injectable({
  providedIn: 'root',
})
export class SelectivePreloadingStrategyService implements PreloadingStrategy {
  preloadedModules: string[] = [];

  constructor(private allModelServices: AllModelServices) {
  }
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // console.log(route, '异步加载---');
    if (route.data && route.data.preload) {
      this.preloadedModules.push(route.path); // 会将所选路由记录在数组中；
      console.log('Preloaded: ' + route.path);
      // this.allModelServices.arr().then(res => {
      //   console.log(res, 'res yibu');
      // }).catch(err => console.log(err));
      return load();
    } else {
      return of(null);
    }
  }
}
