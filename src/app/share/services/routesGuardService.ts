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

@Injectable()
export class RoutesGuardService implements CanActivateChild, CanActivate, Resolve<any> {
  public isBecome: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  constructor(private router: Router) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(childRoute, state, 'state xxx', this.isBecome);
    // return this.isBecome.filter(status => typeof status === 'boolean');
    return true;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(route.routeConfig, state, 'activate xxx', this.isBecome);
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


import { PreloadingStrategy, Route } from '@angular/router';
import {BaseRepository} from './base.repository';

@Injectable({
  providedIn: 'root',
})
export class SelectivePreloadingStrategyService implements PreloadingStrategy {
  preloadedModules: string[] = [];

  constructor(private baseRepository: BaseRepository<any>) {
  }
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // console.log(route, '异步加载---');
    if (route.data && route.data.preload) {
      this.preloadedModules.push(route.path); // 会将所选路由记录在数组中；
      console.log('Preloaded: ' + route.path);
      this.baseRepository.getAllModel().subscribe(res => {
        console.log('yibu', res);
        return load();
      });
      // return load();
    } else {
      return of(null);
    }
  }
}
