import {
  Component,
  Injectable,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from './modal.directive';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SpinnerDirective } from '../spinner/spinner.directive';

@Component({
  selector: 'layout-modal',
  templateUrl: './modal.component.html',
})
@Injectable()
export class ModalComponent{
  public modalDirective: ModalDirective;

  @ViewChild('layoutModal') private content: TemplateRef<ModalComponent>;
  @ViewChild('spinner') private spinner: SpinnerComponent;

  private modalRef: NgbModalRef;
  public spinnerFlag: boolean = true;

  constructor(private modalService: NgbModal) {}

  open(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.spinnerFlag = false;
      this.modalRef = this.modalService.open(this.content,{size: this.modalDirective.size});
      this.modalRef.result.then(resolve, resolve);
    });
  }

  async action() {
    this.spinnerFlag = true;
    await this.modalDirective.buttonAction();
  }

  async actionClose() {
    console.log(`El button close defined is ==> ${this.modalDirective.buttonCloseDefined}`)
    if(this.modalDirective.buttonCloseDefined){
      this.modalDirective.buttonClose();
    }else{
      this.modalRef.close();
    }
  }

  async close(){
    this.spinnerFlag = false;
    this.modalRef.close();
  }

  setModalDirective(_modalDirective: ModalDirective){
    this.modalDirective = _modalDirective;
  }

  getSpinnerConfig(): SpinnerDirective{
    return {
      showMessage: false,
      size: 'lg',
      center: false
    }
  }
}
