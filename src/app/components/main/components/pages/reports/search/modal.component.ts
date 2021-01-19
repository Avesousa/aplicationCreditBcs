import { Component } from "@angular/core";
import { Report } from "src/app/components/main/models/report.model";
import { ModalClass } from "../../../layout/components/modal/modal.class";

@Component({
  selector: 'search-modal',
  templateUrl: './modal.component.html'
})
export class ModalSearchComponent extends ModalClass {

  constructor() {
    super();
  }

  newData() {
  }

  setFiles(files: Report[]) {
    this.data = files;
  }

  getData(): Report[] {
    return <Report[]>this.data;
  }

}
