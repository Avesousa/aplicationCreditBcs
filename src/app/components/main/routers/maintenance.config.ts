import { PageCommissionUnsubscribeComponent } from '../components/pages/maintenance/commission-unsubscribe/index.component';
import { PageBranchesComponent } from '../components/pages/maintenance/branch/index.component';
import { PageCommissionesAmountComponent } from '../components/pages/maintenance/commission-amount/index.component';
import { PageCommissionComponent } from '../components/pages/maintenance/commission/index.component';
import { PageProductComponent } from '../components/pages/maintenance/products/index.component';

export const maintenanceRouterConfig = [
  {
    path: 'mantenimiento',
    children: [
      {
        path: 'baja-comisiones',
        component: PageCommissionUnsubscribeComponent,
      },
      {
        path: 'comisiones-cartas',
        component: PageCommissionComponent,
      },
      {
        path: 'comisiones-importe',
        component: PageCommissionesAmountComponent,
      },
      {
        path: 'productos',
        component: PageProductComponent,
      },
      {
        path: 'sucursales',
        component: PageBranchesComponent,
      },
    ],
  },
];
