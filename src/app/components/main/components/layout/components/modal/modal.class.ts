import { Directive, Output, EventEmitter, ViewChild } from "@angular/core";
import { ModalComponent } from "./modal.component";
import { ModalDirective } from "./modal.directive";

@Directive()
export abstract class ModalClass {
    @ViewChild('layoutModal') public content: ModalComponent;

    @Output() eventOpen = new EventEmitter<string>();

    public idDisabled: boolean = false;
    public object: any;
    public data: any[];
    public modalDirective: ModalDirective;
    public motive: string;

    public open(type: string) {
        this.eventOpen.emit(type);
    }

    public async openModal() {
        this.content.setModalDirective(this.modalDirective);
        return await this.content.open();
    }

    public closeModal(){
        this.content.close();
    }

    public setData(_object: any): void {
        this.object = _object;
    }

    config(_config: ModalDirective) {
        this.modalDirective = _config;
    }

    abstract getData(): any;
    abstract newData();

}
