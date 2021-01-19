import { Component, Input } from '@angular/core';
import { ModalClass } from '../../../layout/components/modal/modal.class';

@Component({
  selector: 'layout-confirm',
  templateUrl: './confirm.component.html',
})
export class ModalConfirmComponent extends ModalClass {

  public withMotive: boolean = false;
  public textConfirm: string = '';
  public textDisabled: boolean = true;

  constructor() {
    super();
    this.newData();
  }
  
  newData() {
    this.object = new Object();
  }

  getData(): any {
    return <any>this.object;
  }

  setTextConfirm(_textConfirm: string){
    this.textConfirm = _textConfirm;
  }

  runMotive(disabled){
    this.textDisabled = !disabled;
    this.withMotive = true;
  }

}
