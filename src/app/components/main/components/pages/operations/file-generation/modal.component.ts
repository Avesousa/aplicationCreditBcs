import { Component } from "@angular/core";
import { FileGeneration } from "src/app/components/main/models/fileGeneration.model";
import { ModalClass } from "../../../layout/components/modal/modal.class";

@Component({
  selector: 'file-generation-modal',
  templateUrl: './modal.component.html'
})
export class ModalFileGenerationComponent extends ModalClass {

  constructor() {
    super();
  }

  newData() {
  }

  setFiles(files: FileGeneration[]) {
    this.data = files;
  }

  getData(): FileGeneration[] {
    return <FileGeneration[]>this.data;
  }

}
