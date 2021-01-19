import { Component, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { StatisticService } from '../../../../services/statistic.service';
import { AlertComponent } from '../../../layout/components/alert/alert.component';
import { ModalStatisticsComponent } from './modal.component';

@Component({
  selector: 'page-statistic',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class PageStatisticsComponent {

  @ViewChild('modalStatistic') modal: ModalStatisticsComponent;
  @ViewChild('alertStatistic') alert: AlertComponent;
  public spinnerFlag: boolean = false;
  public typeReport: number = null;
  public hoveredDate: NgbDate | null = null;

  public fromDate: NgbDate | null;
  public toDate: NgbDate | null;
  public optionReport: any[];

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private statisticService: StatisticService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.optionReport = this.statisticService.getOptionsReports();
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  openModal() {
    this.spinnerFlag = true;
    this.getModalDirective();
    this.modal.setHeaderTable(this.statisticService.getHeaderReport(this.typeReport));
    this.getReport();
  }

  private getReport() {
    let req = {
      to: `${this.toDate.year}${this.toDate.month}`,
      from: `${this.fromDate.year}${this.fromDate.month}`,
      report: this.typeReport
    }
    this.statisticService.getReport(req).subscribe((data) => {
      this.modal.setFiles({ data: data, header: Object.keys(data[0]) });
      this.modal.openModal();
      this.spinnerFlag = false;
    }, (error) => {
      this.alert.show(error.message == '' || !error.message ? 'Error no encontrado' : error.message, this.alert.danger);
      this.spinnerFlag = false;
    });
  }

  private getModalDirective() {
    this.modal.modalDirective = {
      title: this.typeReport ? this.optionReport[this.typeReport - 1].description : 'Reporte de estadística',
      buttonActionLabel: 'Imprimir',
      buttonCloseLabel: 'Cancelar',
      size: 'xl',
      buttonAction: () => {
        window.print();
        this.modal.closeModal();
      }
    }
  }

}
