import { Component } from '@angular/core';
import { Product } from 'src/app/components/main/models/product.model';
import { ModalClass } from '../../../layout/components/modal/modal.class';

@Component({
  selector: 'product-modal',
  templateUrl: './modal.component.html',
})
export class ModalProductComponent extends ModalClass{

  constructor() {
    super();
    this.newData();
  }

  newData(){
    this.object = new Product();
  }

  getData(): Product{
    return <Product>this.object;
  }

}
