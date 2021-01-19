import { PageQueryComponent } from '../components/pages/operations/query/index.component';
import { PageStatisticsComponent } from '../components/pages/operations/statistics/index.component';
import { PageFileGenerationComponent } from '../components/pages/operations/file-generation/index.component';

export const operationsRouterconfig = [
  {
    path: 'operaciones',
    children: [
      {
        path: 'generacion-archivos',
        component: PageFileGenerationComponent,
      },
      {
        path: 'estadistica',
        component: PageStatisticsComponent,
      },
      {
        path: 'consultas/:from/:to/:month',
        component: PageQueryComponent,
      },
    ],
  },
];
