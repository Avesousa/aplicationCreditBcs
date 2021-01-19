import { Component, OnInit, ViewChild } from '@angular/core';
import { FileGenerationService } from 'src/app/components/main/services/fileGeneration.service';
import { AlertComponent } from '../../../layout/components/alert/alert.component';
import { ModalFileGenerationComponent } from './modal.component';

@Component({
  selector: 'page-generation-file',
  templateUrl: './index.component.html'
})
export class PageFileGenerationComponent implements OnInit {
  @ViewChild('modalFileGeneration') modal: ModalFileGenerationComponent;
  @ViewChild('alertFileGeneration') alert: AlertComponent;
  public spinnerFlag: boolean = false;
  public active: number;
  constructor(private _FileGenerationService: FileGenerationService) { }

  ngOnInit(): void {
    this.active = 1;
  }

  openModal(){
    this.spinnerFlag = true;
    this.modal.modalDirective={
      title: 'Listado de altas de acuerdos',
      buttonActionLabel: 'Aceptar',
      buttonCloseLabel: 'Cerrar',
      size:'xl',
      buttonAction: () => { this.modal.closeModal() }
    }
    this.getList();
  }

  sendLetter(){
    this.spinnerFlag = true;
    this._FileGenerationService.sendFiles().subscribe(()=>{
      this.alert.show('La carta ha sido enviada correctamente', this.alert.success);
      this.spinnerFlag = false;
    }, (error)=>{
      this.spinnerFlag = false;
      this.alert.show(error.message == '' || !error.message ? 'Error no encontrado' : error.message, this.alert.danger);
    })
  }

  getList() {
    this._FileGenerationService.getListFiles().subscribe((data) => {
      this.modal.setFiles(data);
      this.modal.openModal();
      this.spinnerFlag = false;
    }, (error) => {
      this.alert.show(error.message == '' || !error.message ? 'Error no encontrado' : error.message, this.alert.danger);
      this.spinnerFlag = false;
    })
  }


}
