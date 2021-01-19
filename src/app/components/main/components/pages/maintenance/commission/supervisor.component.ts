import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/components/auth/models/user.model';
import { Commission } from 'src/app/components/main/models/commission.model';
import { CommissionService } from 'src/app/components/main/services/commission.service';
import { AlertComponent } from '../../../layout/components/alert/alert.component';

@Component({
  selector: 'commission-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./index.component.scss'],
})
export class SupervisorCommissionComponent implements OnInit {
  @ViewChild('alertCommission') alert: AlertComponent;

  public data: Array<Commission>;
  private userProfile: User;
  public allCommissions: Commission[];
  public spinnerFlag: boolean = false;

  constructor(
    private _commissionService: CommissionService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.userProfile = JSON.parse(this.cookieService.get('USER_DATA'));
    this.getList(true);
  }

  getList(isInit): void {
    this.spinnerFlag = true;
    this._commissionService.getCommissionListSupervisor().subscribe(
      (res) => {
        this.data = res;
        isInit ? (this.allCommissions = this.data) : null;
        this.spinnerFlag = false;
      },
      (error) => {
        this.alert.show(error.message == '' || !error.message ? 'Error no encontrado' : error.message, this.alert.danger);
        this.spinnerFlag = false;
      }
    );
  }

  aprobar(item: Commission): void {
    if (
      confirm(
        `Desea aprobar ${item.tipoArchivo === 'IMPACS' ? 'Comisiones' : 'Cartas'
        } ${item.formatFecha}`
      )
    ) {
      item.aprobado = 'S';
      item.usuario = this.userProfile.username;
      this._commissionService.updateCommission(item).subscribe(
        (res) => {
          this.alert.show(res.message, this.alert.success);
          this.getList(true);
        },
        (error) => {
          this.alert.show(error.message == '' || !error.message ? 'Error no encontrado' : error.message, this.alert.danger);
        }
      );
    }
  }

  denegar(item: Commission): void {
    if (
      confirm(
        `Desea denegar ${item.tipoArchivo === 'IMPACS' ? 'Comisiones' : 'Cartas'
        } ${item.formatFecha}`
      )
    ) {
      item.aprobado = 'N';
      item.usuario = this.userProfile.username;
      this._commissionService.updateCommission(item).subscribe(
        (res) => {
          this.alert.show(res.message, this.alert.success);
          this.getList(true);
        },
        (error) => {
          this.alert.show(error.message == '' || !error.message ? 'Error no encontrado' : error.message, this.alert.danger);
        }
      );
    }
  }
}
