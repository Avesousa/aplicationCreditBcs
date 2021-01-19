import { Component, TemplateRef } from "@angular/core";

@Component({
    selector: 'layout-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})

export class AlertComponent {

    public alerts: any[] = [];
    public success: any = { classname: 'bg-success text-light', delay: 5000 };
    public danger: any = { classname: 'bg-danger text-light', header: 'Alerta', delay: 0 };

    isTemplate(alert) { return alert.textShow instanceof TemplateRef; }

    show(textShow: string | TemplateRef<any>, options: any = {}) {
      this.alerts.push({ textShow, ...options }); 
    }
  
    remove(alert) {
      this.alerts = this.alerts.filter(t => t !== alert);
    }
    
}