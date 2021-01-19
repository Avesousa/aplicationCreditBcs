import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/components/auth/models/user.model';
import { DataSearch } from 'src/app/components/main/models/report.model';
import { ReportService } from 'src/app/components/main/services/report.service';
import { AlertComponent } from '../../../layout/components/alert/alert.component';

import { ModalSearchComponent } from './modal.component';

@Component({
  selector: 'page-search',
  templateUrl: './index.component.html',
})
export class PageSearchComponent implements OnInit {
  @ViewChild('modalSearch') modal: ModalSearchComponent;
  @ViewChild('alertSearch') alert: AlertComponent;
  private userProfile: User;
  public userData: any;
  public spinnerFlag: boolean = false;
  public searchTerm: any;
  public request: DataSearch;

  constructor(private _ReportService: ReportService,private cookieService: CookieService) {}

  ngOnInit(): void {
    this.userProfile = JSON.parse(this.cookieService.get('USER_DATA'));
    this.updateSearch();
  }

  isRetail(): boolean {
    return this.userProfile.role === 'RETAIL' || this.userProfile.role === 'ADMINISTRADOR'
  }

  openModal() {
    this.spinnerFlag = true;
    this.getModalDirective();
    this.search();
  }

  private updateSearch(){
    this.request = new DataSearch();
    this.request.perfil = this.userProfile.perfil;
    this.request.sucursal = parseInt(this.userProfile.sucursalPeopleSoft);
    this.request.tipoDocumento = '';
    this.request.nroDocumento = '';
    this.request.cuit = '';
    this.request.nombre = '';
    this.request.nroCta = '';
  }

  private getModalDirective(){
    this.modal.modalDirective = {
      title: 'Listado de búsqueda de acuerdos',
      buttonActionLabel: 'Aceptar',
      buttonCloseLabel: 'Cerrar',
      size: 'xl',
      buttonAction: () => {
        this.modal.closeModal();
      },
    };
  }

  search() {
    this._ReportService.searchClient(this.request).subscribe(
      (data) => {
        this.alert.show(
          'Se ha realizado la búsqueda con éxito',
          this.alert.success
        );
        this.modal.setFiles(data);
        this.modal.openModal();
        this.spinnerFlag = false;
      },
      (error) => {
        this.alert.show(
          error.message == '' || !error.message
          ? 'Error no encontrado'
          : error.message,
          this.alert.danger
          );
        this.spinnerFlag = false;
      }
    );
  }
}
