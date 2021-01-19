import { Component } from "@angular/core";
import { ModalClass } from "../../../layout/components/modal/modal.class";

@Component({
  selector: 'statistic-modal',
  templateUrl: './modal.component.html'
})
export class ModalStatisticsComponent extends ModalClass {

  public headerTable: string[];
  public headerData: string[];
  constructor() {
    super();
  }

  newData() {
  }

  setFiles(reports: any) {
    this.data = reports.data;
    this.headerData = reports.header;
    console.log(`The header data ==> ${this.headerData}`);
  }

  public setHeaderTable(header: string[]){
    this.headerTable = header;
  }

  getData(): any[] {
    return <any[]>this.data;
  }

}
