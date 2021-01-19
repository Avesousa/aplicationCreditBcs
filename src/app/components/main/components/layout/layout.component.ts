import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
    templateUrl: "./layout.component.html",
    styleUrls: ["./layout.component.scss"],
    providers: [LayoutService]
})

export class LayoutComponent {
    constructor(public layoutService: LayoutService) {

    }
}
