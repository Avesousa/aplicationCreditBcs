import { Component, Input, ViewChild } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { CheckboxConfig } from "./checkbox.config";
import { QueryOperationComponent } from "./query.component";

@Component({
    selector: 'row-action',
    templateUrl: './checkbox.component.html'
})
export class CheckBoxOperationComponent{

    @Input() config: CheckboxConfig;
    public spinnerFlag: boolean = false;
    private query: QueryOperationComponent;

    public motive: string = '';
    public input: any;

    action(event):void{
        this.query = this.config.query;
        this.spinnerShow();
        this.input = event;
        this.config.data.viejaRecomendacion = this.config.data.nuevaRecomendacion;
        if(this.input.target.checked){
            if(this.config.type == 'DL'){
                this.getModalDirective(this.input);
                this.query.confirm.setTextConfirm('Motivo por el cual desea rechazar el acuerdo:');
                this.query.confirm.runMotive(true);
                this.query.confirm.openModal();
            }else{
                this.query.changeState(this);
            }
        }else{
            this.input.path[0].checked = true;
            this.spinnerHide();
        }
    }

    private getModalDirective(input){
        this.query.confirm.modalDirective = {
            title: `Confirmar rechazo de renovación`,
            buttonActionLabel: 'confirmar',
            buttonCloseLabel: 'Cancelar',
            buttonCloseDefined: true,
            size: 'md',
            buttonAction: () => { this.reject() },
            buttonClose: () => {
                this.query.backState(this.config.data);
                input.path[0].checked = false;
                this.query.confirm.motive = "";
                this.query.confirm.closeModal();
                this.spinnerHide();
            }
        }
    }

    reject(){
        this.config.data.motivo = this.query.confirm.motive;
        this.query.confirm.motive = "";
        this.query.changeState(this);
    }

    spinnerShow(){
        this.spinnerFlag = true;
    }

    spinnerHide(){
        this.spinnerFlag = false;
    }
}
