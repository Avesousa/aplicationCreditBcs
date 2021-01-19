import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { LayoutComponent } from '../components/layout/layout.component';
// Pages
import { PageDashboardComponent } from '../components/pages/dashboard/dashboard.component';
import { maintenanceRouterConfig } from './maintenance.config';
import { reportsRouterConfig } from './reports.config';
import { operationsRouterconfig } from './operations.config';

const mainRoutes: Routes = [
  {
    path: '',
    redirectTo: '/bcs',
    pathMatch: 'full',
  },
  {
    path: 'bcs',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: PageDashboardComponent,
      },
      ...reportsRouterConfig,
      ...maintenanceRouterConfig,
      ...operationsRouterconfig
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(mainRoutes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
})
export class MainRoutingModule {}
