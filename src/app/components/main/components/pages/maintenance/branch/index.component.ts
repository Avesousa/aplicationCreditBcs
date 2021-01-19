import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Branch } from 'src/app/components/main/models/branch.model';
import { BranchService } from 'src/app/components/main/services/branch.service';
import { AlertComponent } from '../../../layout/components/alert/alert.component';
import { ModalConfirmComponent } from '../../../layout/components/confirm/confirm.component';
import { ModalClass } from '../../../layout/components/modal/modal.class';
import { ModalBranchComponent } from './modal.component';


@Component({
  selector: 'page-branch',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})

export class PageBranchesComponent implements OnInit {

  @ViewChild('modalBranch') modal: ModalBranchComponent;
  @ViewChild('confirmBranch') confirm: ModalConfirmComponent;
  @ViewChild('alertBranch') alert: AlertComponent;

  public data: Branch[] = [];
  public allBranches: Branch[];
  public searchTerm: string;
  public spinnerFlag: boolean = false;

  constructor(private _branchService: BranchService) { }

  ngOnInit(): void {
    this.getList(true);
  }

  getList(isInit) {
    this.spinnerFlag = true;
    this._branchService.getBranchList().subscribe((data) => {
      this.data = data;
      isInit ? this.allBranches = this.data : null;
      this.spinnerFlag = false;
    }, (error) => {
      this.alert.show(error.message == '' || !error.message ? 'Error no encontrado' : error.message, this.alert.danger);
      this.spinnerFlag = false;
    })
  }

  openAddModal(type) {
    this.setModalDirective('Agregar', true, this.modal);
    this.modal.newData();
    this.modal.openModal();
  }

  openEditModal(_branch: Branch) {
    this.modal.setData(_branch);
    this.setModalDirective('Aceptar', false, this.modal);
    this.modal.openModal();
  }

  openDeleteModal(_branch: Branch) {
    this.confirm.setData(_branch);
    this.setModalDirective('Eliminar', false, this.confirm, true);
    this.confirm.setTextConfirm(`Deseas eliminar ${_branch.nombre}`);
    this.confirm.openModal();
  }

  setModalDirective(action: string, isAdd: boolean, modal: ModalClass, isDelete?: boolean) {
    modal.idDisabled = !isAdd;
    modal.modalDirective = {
      title: `${action} Sucursal`,
      buttonActionLabel: action,
      buttonCloseLabel: 'Cancelar',
      size: 'md',
      buttonAction: () => { isAdd ? this.create() : isDelete ? this.delete() : this.edit() }
    }
  }

  search(_textSearch: string) {
    let textSearch: string = _textSearch.toLowerCase();
    this.data = this.allBranches.filter((data) => data.nombre.toLowerCase().includes(textSearch) || data.numero.toString().includes(textSearch));
  }

  create(): void {
    console.log('add branch!')
    this._branchService.createBranch(this.modal.getData()).subscribe((res) => {
      this.alert.show(res.message, this.alert.success);
      this.modal.closeModal();
    },
      (error) => {
        this.alert.show(error.message == '' || !error.message ? 'Error no encontrado' : error.message, this.alert.danger);
        this.modal.closeModal();
      });
  }

  edit(): void {
    console.log('edit branch!')
    this._branchService.updateBranch(this.modal.getData()).subscribe((res: any) => {
      this.alert.show(res.message, this.alert.success);
      this.getList(true);
      this.modal.closeModal();
    },
      (error) => {
        this.alert.show(error.message == '' || !error.message ? 'Error no encontrado' : error.message, this.alert.danger);
        this.modal.closeModal();
      });
  }

  delete() {
    this._branchService.deleteBranch(<Branch>this.confirm.getData()).subscribe((res: any) => {
      this.alert.show(res.message, this.alert.success);
      this.getList(true);
      this.confirm.closeModal();
    }, (error) => {
      this.alert.show(error.message == '' || !error.message ? 'Error no encontrado' : error.message, this.alert.danger);
      this.confirm.closeModal();
    });
  }
}

