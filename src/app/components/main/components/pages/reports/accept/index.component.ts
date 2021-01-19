import { Component, OnInit, ViewChild } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BranchService } from "src/app/components/main/services/branch.service";
import { LayoutService } from "src/app/components/main/services/layout.service";
import { ReportService } from "src/app/components/main/services/report.service";
import { ReportClass } from "../report.directive";

@Component({
    selector: 'report-accept',
    templateUrl: '../index.component.html',
    styleUrls: ['../index.component.scss']
  })
  export class PageAcceptComponent extends ReportClass implements OnInit{
    
    public title = 'aceptados';
    public type = 'AC';
    
    constructor(branchService: BranchService, layoutService: LayoutService, reportService: ReportService, cookieService: CookieService) {
      super();
      this._branchService = branchService;
      this._layoutService = layoutService;
      this._reportService = reportService;
      this._cookieService = cookieService;
    }
    
    ngOnInit(){
      this.getData();
    }

  }