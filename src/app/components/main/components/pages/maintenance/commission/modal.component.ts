 import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/components/auth/models/user.model';
import { Commission } from 'src/app/components/main/models/commission.model';
import { Period } from 'src/app/components/main/models/period.model';
import { LayoutService } from 'src/app/components/main/services/layout.service';
import { ModalClass } from '../../../layout/components/modal/modal.class';

@Component({
  selector: 'commission-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./index.component.scss'],
})
export class ModalCommissionComponent extends ModalClass implements OnInit {
  commission: Commission;
  dateInput: NgbDateStruct;
  lastPeriod: string[];
  userProfile: User = new User();

  constructor(private layoutService: LayoutService) {
    super();
    this.newData();
  }

  ngOnInit(): void {
    this.layoutService.getLastPeriod().subscribe(res => this.lastPeriod = res.slice(1))
  }

  newData(): void {
    this.commission = new Commission();
  }

  getData(): Commission {
    this.commission.formatFecha = this.dateInput ? `${this.dateInput.year} ${this.dateInput.month}${this.dateInput.day}`:'';
    this.commission.usuario = this.userProfile.username;
    return <Commission>this.commission;
  }
}
