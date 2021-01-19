import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/components/auth/models/user.model';
import { CommissionService } from 'src/app/components/main/services/commission.service';
import { AlertComponent } from '../../../layout/components/alert/alert.component';
import { ModalCommissionComponent } from './modal.component';
import { QueryCommissionComponent } from './query.component';

@Component({
  selector: 'page-commission',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class PageCommissionComponent implements OnInit {

  @ViewChild('modalCommission') modal: ModalCommissionComponent;
  @ViewChild('alertCommission') alert: AlertComponent;
  @ViewChild('childCommission') child: QueryCommissionComponent;

  public active: number;
  private userProfile: User;

  constructor(private _comissionService: CommissionService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.active = 1;
    this.userProfile = JSON.parse(this.cookieService.get('USER_DATA'));
  }

  isSupervisor(): boolean {
    return this.userProfile.role === 'SUPERVISOR' || this.userProfile.role === 'ADMINISTRADOR'
  }

  openAddModal(type) {
    this.getModalDirective('Agregar', true);
    this.modal.newData();
    this.modal.openModal();
    this.modal.userProfile = this.userProfile;
  }

  getModalDirective(action: string, isAdd: boolean) {
    this.modal.idDisabled = !isAdd;
    this.modal.modalDirective = {
      title: `${action} Producto`,
      buttonActionLabel: action,
      buttonCloseLabel: 'Cancelar',
      size:'md',
      buttonAction: () => this.create()
    }
  }

  create(): void {
    console.log('add branch!')
    this._comissionService.createCommission(this.modal.getData()).subscribe((res) => {
      this.alert.show(res.message, this.alert.success);
      this.modal.closeModal();
      this.active = 1;
      this.child.getList(true);
    },
      (error) => {
        this.alert.show(error.message == '' || !error.message ? 'Error no encontrado' : error.message, this.alert.danger);
        this.modal.closeModal();
      });
  }

}
