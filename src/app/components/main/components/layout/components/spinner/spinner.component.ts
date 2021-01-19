import { Component, Input } from "@angular/core";
import { SpinnerDirective } from "./spinner.directive";

@Component({
    selector:'layout-spinner',
    templateUrl: './spinner.component.html'
})
export class SpinnerComponent{
    @Input() config: SpinnerDirective;
    constructor(){}
}
