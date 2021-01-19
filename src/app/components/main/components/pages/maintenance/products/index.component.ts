import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/components/main/models/product.model';
import { ProductService } from 'src/app/components/main/services/product.service';
import { ModalProductComponent } from './modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertComponent } from '../../../layout/components/alert/alert.component';
import { ModalClass } from '../../../layout/components/modal/modal.class';
import { ModalConfirmComponent } from '../../../layout/components/confirm/confirm.component';

@Component({
  selector: 'page-products',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class PageProductComponent implements OnInit {

  @ViewChild('modalProduct') modal: ModalProductComponent;
  @ViewChild('confirmProduct') confirm: ModalConfirmComponent;
  @ViewChild('alertProduct') alert: AlertComponent;

  public data: Product[] = [];
  public allProducts: Product[];
  public searchTerm: string;
  public spinnerFlag: boolean = false;

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getList(true);
  }

  getList(isInit) {
    this.spinnerFlag = true;
    this._productService.getProductList().subscribe((data) => {
      this.data = data;
      isInit ? this.allProducts = this.data : null;
      this.spinnerFlag = false;
    }, (error) => {
      this.alert.show(error.message == '' || !error.message ? 'Error no encontrado' : error.message, this.alert.danger);
      this.spinnerFlag = false;
    })
  }

  openAddModal(type) {
    this.getModalDirective('Agregar', true, this.modal);
    this.modal.newData();
    this.modal.openModal();
  }

  openEditModal(_product: Product) {
    this.modal.setData(_product);
    this.getModalDirective('Aceptar', false, this.modal);
    this.modal.openModal();
  }

  openDeleteModal(_product: Product) {
    this.confirm.setData(_product);
    this.getModalDirective('Eliminar', false, this.confirm, true);
    this.confirm.setTextConfirm(`Deseas eliminar ${_product.descripcion}`);
    this.confirm.openModal();
  }

  getModalDirective(action: string, isAdd: boolean, modal: ModalClass, isDelete?: boolean) {
    modal.idDisabled = !isAdd;
    modal.modalDirective = {
      title: `${action} Producto`,
      buttonActionLabel: action,
      buttonCloseLabel: 'Cancelar',
      size: 'md',
      buttonAction: () => { isAdd ? this.create() : isDelete ? this.delete() : this.edit() }
    }
  }

  search(_textSearch: string) {
    let textSearch: string = _textSearch.toLowerCase();
    this.data = this.allProducts.filter(
      (data) =>
        data.descripcion.toLowerCase().includes(textSearch) ||
        (data.comision == 'S' ? 'si' : 'no').includes(textSearch) ||
        data.codigo.toString().includes(textSearch));
  }

  create(): void {
    console.log('add branch!')
    this._productService.createProduct(this.modal.getData()).subscribe((res) => {
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
    this._productService.updateProduct(this.modal.getData()).subscribe((res: any) => {
      this.alert.show(res.message, this.alert.success);
      this.getList(false);
      this.modal.closeModal();
    },
      (error) => {
        this.alert.show(error.message == '' || !error.message ? 'Error no encontrado' : error.message, this.alert.danger);
        this.modal.closeModal();
      });
  }

  delete() {
    this._productService.deleteProduct(<Product>this.confirm.getData()).subscribe((res: any) => {
      this.alert.show(res.message, this.alert.success);
      this.getList(false);
      this.confirm.closeModal();
    }, (error) => {
      this.alert.show(error.message == '' || !error.message ? 'Error no encontrado' : error.message, this.alert.danger);
      this.confirm.closeModal();
    });
  }
}
