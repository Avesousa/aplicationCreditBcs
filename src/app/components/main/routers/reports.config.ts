import { PageAcceptComponent } from '../components/pages/reports/accept/index.component';
import { PageExcludeComponent } from '../components/pages/reports/exclude/index.component';
import { PageRejectComponent } from '../components/pages/reports/reject/index.component';
import { PageSearchComponent } from '../components/pages/reports/search/index.component';

export const reportsRouterConfig = [
  {
    path: 'listados',
    children: [
      {
        path: 'aceptar',
        component: PageAcceptComponent,
      },
      {
        path: 'rechazar',
        component: PageRejectComponent,
      },
      {
        path: 'excluir',
        component: PageExcludeComponent,
      },
      {
        path: 'buscar',
        component: PageSearchComponent,
      },
    ],
  },
];
