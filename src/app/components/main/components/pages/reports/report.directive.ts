import { Directive, ViewChild } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { CookieService } from "ngx-cookie-service";
import { User } from "src/app/components/auth/models/user.model";
import { Branch } from "../../../models/branch.model";
import { Report, DataReport } from "../../../models/report.model";
import { BranchService } from "../../../services/branch.service";
import { LayoutService } from "../../../services/layout.service";
import { ReportService } from "../../../services/report.service";
import { AlertComponent } from "../../layout/components/alert/alert.component";
import { ModalReportComponent } from "./modal.component";

@Directive()
export abstract class ReportClass {
    @ViewChild('modalReport') modal: ModalReportComponent;
    @ViewChild('alertReport') alert: AlertComponent;
    public datePeriod: NgbDateStruct;
    public filter: string;
    public branch: Branch = null;
    public period: string = "";
    public wallets: any[] = [
        {
            id: 1,
            description: "Premier"
        },
        {
            id: 0,
            description: "General"
        }
    ];
    public wallet: string = this.wallets[0];
    public branches: Branch[];
    public periods: string[];
    public active: number;
    public requestReport: DataReport;
    public userProfile: User;
    public spinnerFlag: boolean = false;
    public spinnerFlagMain: boolean = false;
    
    public _branchService: BranchService;
    public _layoutService: LayoutService;
    public _reportService: ReportService;
    public _cookieService: CookieService;
    
    constructor() {
    }

    abstract title: string;
    abstract type: string;

    public fecha() {
        return `${this.datePeriod.day}/${this.datePeriod.month}/${this.datePeriod.year}`
    }

    public getData() {
        this.spinnerFlagMain = true;
        this.refreshBranches();
        this.userProfile = JSON.parse(this._cookieService.get('USER_DATA'));
        this.updateReport();
        this._branchService.getBranchList().subscribe((data) =>{
            this.branches = data
            this.spinnerFlagMain = false;
        }, 
        (error)=>{
            this.alert.show(error.message == '' || !error.message ? 'Error no encontrado' : error.message, this.alert.danger);
        });
        this._layoutService.getPeriods().subscribe((data) =>{
            this.periods = data.splice(1);
            this.spinnerFlagMain = false;
        },(error)=>{
            this.alert.show(error.message == '' || !error.message ? 'Error no encontrado' : error.message, this.alert.danger);
            this.spinnerFlagMain = false;
        });
    }
    
    public viewPeriod() {
        this.openModal();
    }
    
    public viewBranch() {
        this.openModal();
    }
    
    private refreshBranches(){
        this.branches = [];
        this.branches.push({ numero: 0, nombre: "Todas" });
    }

    private openModal() {
        this.spinnerFlag = true;
        this.getModalDirective();
        this.getReports();
    }
    
    private getReports(){
        this._reportService.getReport(this.requestReport).subscribe((data: Report[]) => {
            this.modal.setBranches(this.branches);
            this.modal.setFiles(this.getReportByBranch(data));
            this.modal.setAgreementType(this.title);
            this.modal.openModal();
            this.spinnerFlag = false;
        },
        (error)=>{
            this.alert.show(error.message == '' || !error.message ? 'Error no encontrado' : error.message, this.alert.danger);
            this.spinnerFlag = false;
        })
    }

    private updateReport(){
        this.requestReport = new DataReport();
        this.requestReport.cliente = this.wallets[0].id;
        this.requestReport.empleado = this.userProfile.empleado;
        this.requestReport.renueva = this.type;
        this.requestReport.periodo = '';
        this.requestReport.sucListado = 0;
        this.requestReport.sucursal = null;
    }

    private getReportByBranch(data: Report[]): any {
        return data.reduce((newReport, report) => {
            let flag = newReport[report["sucursal"]] || [];
            flag.push(report);
            return { ...newReport, [report["sucursal"]]: flag };
        }, {});
    }

    private getModalDirective() {
        this.modal.modalDirective = {
            title: this.title,
            buttonActionLabel: 'Imprimir',
            buttonCloseLabel: 'Cancelar',
            size: 'xl',
            buttonAction: () => { this.modal.closeModal() }
        }
    }

}