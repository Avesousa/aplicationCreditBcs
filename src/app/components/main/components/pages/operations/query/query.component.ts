import { Component, Input, OnChanges, OnInit, ViewChild } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { NgxSpinnerService } from "ngx-spinner";
import { User } from "src/app/components/auth/models/user.model";
import { Agreement } from "src/app/components/main/models/agreement.model";
import { AgreementService } from "src/app/components/main/services/agreement.service";
import { AlertComponent } from "../../../layout/components/alert/alert.component";
import { ModalConfirmComponent } from "../../../layout/components/confirm/confirm.component";
import { CheckBoxOperationComponent } from "./checkbox.component";

@Component({
    selector: 'query-content',
    templateUrl: './query.component.html',
    providers: [AgreementService]
})
export class QueryOperationComponent implements OnInit {

    @ViewChild('alert') alert: AlertComponent;
    @ViewChild('confirmQuery') confirm: ModalConfirmComponent;
    @Input() info: any;
    @Input() type: string;
    public page: number = 1;
    public collectionSize: number = 0;
    public count: number = 0;
    public data: Agreement[] = [];
    public spinnerFlag: boolean = false;
    public spinnerFlagMotive: boolean = false;
    private userProfile: User;

    constructor(private _agreementService: AgreementService, public spinner: NgxSpinnerService, private cookieService: CookieService) { }

    changeState(checkBox: CheckBoxOperationComponent) {
        let data: Agreement = checkBox.config.data;
        data.renueva = checkBox.config.type == 'PE' ? '' : checkBox.config.type;
        data.usuario = 
        this._agreementService.updateAgreement(data).subscribe((res) => {
            this.alert.show('Se ha realizado la acción correctamente', this.alert.success);
            checkBox.spinnerHide();
            this.confirm.closeModal();
        }, (error) => {
            this.alert.show(`El acuerdo de ${data.nombre} no se ha podido modificar`, this.alert.danger);
            this.backState(data);
            checkBox.input.path[0].checked = false;
            checkBox.spinnerHide();
            this.confirm.closeModal();
        })
    }

    backState(data: Agreement) {
        data.nuevaRecomendacion = data.viejaRecomendacion;
    }

    ngOnInit() {
        this.userProfile = JSON.parse(this.cookieService.get('USER_DATA'));
        this.getList();
    }

    getList() {
        this.spinnerFlag = true;
        let request = {
            fechaDesde: this.info.from,
            fechaHasta: this.info.to,
            renueva: this.type,
            pagina: this.page,
            orden: 1
        }
        this._agreementService.getAgreementList(request).subscribe((data) => {
            this.data = data;
            this.spinnerFlag = false;
            this.collectionSize = data[0].maximo;
            this.count = data[0].cantidad;
        }, (error) => {
            this.alert.show(error.message == '' || !error.message ? 'Error no encontrado' : error.message, this.alert.danger);
            this.spinnerFlag = false;
        })
    }

    getMotive(item: Agreement) {
        this.spinnerFlagMotive = true;
        this._agreementService.getMotive(item).subscribe((data) => {
            item.motivo = data;
            this.viewMotive(item);
            this.spinnerFlagMotive = false;
        }, (error) => {
            this.alert.show(error.message == '' || !error.message ? 'Error no encontrado' : error.message, this.alert.danger);
            this.spinnerFlagMotive = false;
        })
    }

    //View motive of agreement
    viewMotive(agreement: Agreement) {
        this.confirm.modalDirective = {
            title: 'Motivo de rechazo',
            buttonActionLabel: 'Aceptar',
            buttonCloseLabel: 'Cerrar',
            size: 'md',
            buttonAction: () => { this.confirm.closeModal() }
        }
        this.confirm.motive = agreement.motivo;
        this.confirm.setTextConfirm('Motivo por el cual se realizo el rechazo');
        this.confirm.runMotive(false);
        this.confirm.openModal();
    }

    //Pagination
}
