import { Component } from '@angular/core';
import { Branch } from 'src/app/components/main/models/branch.model';
import { ModalClass } from '../../../layout/components/modal/modal.class';

@Component({
  selector: 'branch-modal',
  templateUrl: './modal.component.html',
})
export class ModalBranchComponent extends ModalClass {


  constructor() {
    super();
    this.newData();
  }

  newData() {
    this.object = new Branch();
  }

  getData(): Branch {
    return <Branch>this.object;
  }


}
