import { Component } from "@angular/core";
import { Branch } from "../../../models/branch.model";
import { Report } from "../../../models/report.model";
import { ModalClass } from "../../layout/components/modal/modal.class";

@Component({
  selector: 'report-modal',
  templateUrl: './modal.component.html'
})
export class ModalReportComponent extends ModalClass {

  public branches: Branch[];
  public agreementType: string;
  constructor() {
    super();
    this.newData();
  }

  newData() {
  }

  setFiles(reports: any) {
    console.log(reports);
    this.data = reports;
  }

  setBranches(branches: Branch[]){
    this.branches = branches;
  }

  public setAgreementType(agreement: string){
    this.agreementType = agreement;
  }

  getNameBranch(number: number){
    return this.branches.filter(branch => branch.numero = number)[0];
  }

  getData(): Report[] {
    return <Report[]>this.data;
  }

}
