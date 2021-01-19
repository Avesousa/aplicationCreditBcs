import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { NgxSpinnerModule } from 'ngx-spinner';

// Components
import { LayoutComponent } from './components/layout/layout.component';
import { NavComponent } from './components/layout/components/nav/nav.component';
import { HeaderComponent } from './components/layout/components/header/header.component';
import { SidebarComponent } from './components/layout/components/sidebar/sidebar.component';
import { FooterComponent } from './components/layout/components/footer/footer.component';

// Services
import { LayoutService } from './services/layout.service';
import { ProductService } from './services/product.service';
import { BranchService } from './services/branch.service';
import { ReportService } from './services/report.service';
import { CommissionService } from './services/commission.service';
import { AgreementService } from './services/agreement.service';

// Modules
import { MainRoutingModule } from './routers/main-routing.module';

//Pages
import { PageProductComponent } from './components/pages/maintenance/products/index.component';
import { ModalComponent } from './components/layout/components/modal/modal.component';
import { ModalProductComponent } from './components/pages/maintenance/products/modal.component';
import { ModalBranchComponent } from './components/pages/maintenance/branch/modal.component';
import { PageBranchesComponent } from './components/pages/maintenance/branch/index.component';
import { QueryCommissionComponent } from './components/pages/maintenance/commission/query.component';
import { ModalCommissionComponent } from './components/pages/maintenance/commission/modal.component';
import { SupervisorCommissionComponent } from './components/pages/maintenance/commission/supervisor.component';
import { PageCommissionComponent } from './components/pages/maintenance/commission/index.component';
import { PageAcceptComponent } from './components/pages/reports/accept/index.component';
import { PageSearchComponent } from './components/pages/reports/search/index.component';
import { ModalSearchComponent } from './components/pages/reports/search/modal.component';
import { PageExcludeComponent } from './components/pages/reports/exclude/index.component';
import { PageRejectComponent } from './components/pages/reports/reject/index.component';
import { AlertComponent } from './components/layout/components/alert/alert.component';
import { ModalConfirmComponent } from './components/layout/components/confirm/confirm.component';
import { PageQueryComponent } from './components/pages/operations/query/index.component';
import { QueryOperationComponent } from './components/pages/operations/query/query.component';
import { CheckBoxOperationComponent } from './components/pages/operations/query/checkbox.component';
import { ModalFileGenerationComponent } from './components/pages/operations/file-generation/modal.component';
import { PageFileGenerationComponent } from './components/pages/operations/file-generation/index.component';
import { FileGenerationService } from './services/fileGeneration.service';
import { SpinnerComponent } from './components/layout/components/spinner/spinner.component';
import { ModalReportComponent } from './components/pages/reports/modal.component';
import { PageStatisticsComponent } from './components/pages/operations/statistics/index.component';
import { StatisticService } from './services/statistic.service';
import { ModalStatisticsComponent } from './components/pages/operations/statistics/modal.component';
import { StatisticDirective } from './components/pages/operations/statistics/statistic.directive';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    MainRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    NgxSpinnerModule,
  ],
  declarations: [
    LayoutComponent,
    NavComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    PageProductComponent,
    PageBranchesComponent,
    PageAcceptComponent,
    PageSearchComponent,
    ModalSearchComponent,
    PageExcludeComponent,
    PageRejectComponent,
    PageQueryComponent,
    ModalComponent,
    ModalProductComponent,
    ModalBranchComponent,
    ModalConfirmComponent,
    ModalCommissionComponent,
    ModalFileGenerationComponent,
    ModalReportComponent,
    PageCommissionComponent,
    SupervisorCommissionComponent,
    QueryCommissionComponent,
    QueryOperationComponent,
    CheckBoxOperationComponent,
    AlertComponent,
    PageFileGenerationComponent,
    SpinnerComponent,
    PageStatisticsComponent,
    ModalStatisticsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    DecimalPipe,
    LayoutService,
    ProductService,
    BranchService,
    CommissionService,
    ReportService,
    AgreementService,
    FileGenerationService,
    StatisticService,
    StatisticDirective
  ],
})
export class MainModule {}
