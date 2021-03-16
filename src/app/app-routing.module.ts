import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {LoginComponent} from './pages/login/login.component';
import {MiddleComponent} from './pages/middle/middle.component';
import {SelectivePreloadingStrategyService} from './share/services/routesGuardService';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/resources/AppMember' },
  { path: '', pathMatch: 'full', redirectTo: 'middle' },
  { path: 'login', component: LoginComponent },
  { path: 'middle', component: MiddleComponent},
  { path: '',
    loadChildren: () => import('./share/layout/layout.module').then(m => m.LayoutModule)
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {preloadingStrategy: SelectivePreloadingStrategyService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
