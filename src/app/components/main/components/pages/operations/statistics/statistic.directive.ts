import { Injectable } from "@angular/core";

@Injectable()
export class StatisticDirective {

    private common = ['Cuenta', 'Cuit', 'Nombre'];

    private headerTable: any[] = [
        ['Periodo', 'Recomendación', 'cantidad'],
        [...this.common, 'Hasta', 'Periodo', 'Recomendación', 'Nueva Recomendación'],
        ['Moneda', 'Fecha', ...this.common, 'Limite', 'Importe'],
        ['Fecha', 'Cantidad', 'Supervisor', 'Importe'],
        ['Fecha', ...this.common, 'Vencimiento'],
        ['Fecha', 'Supervisor', 'Cantidad'],
        [...this.common, 'Supervisor', 'Fecha', 'Motivo'],
        [...this.common, 'Fecha Envio', 'Fecha Acumulada', 'Descripción']];

    private optionsReports = [
        { value: 1, description: 'Recomendación StrategyWare' },
        { value: 2, description: 'Cambios Realizados' },
        { value: 3, description: 'Comisiones Enviadas (Detalle)' },
        { value: 4, description: 'Comisiones Enviadas (Resumen)' },
        { value: 5, description: 'Acuerdos Enviados (Detalle)' },
        { value: 6, description: 'Acuerdos Enviados (Resumen)' },
        { value: 7, description: 'Baja de comisiones' },
        { value: 8, description: 'Comisiones Cobradas' },
        { value: 2, description: 'Excluidos del Cobro Comisión' }];
    
    public getHeaderTable(){
        return this.headerTable;
    }

    public getOptionsReports(){
        return this.optionsReports;
    }

}