import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StatisticDirective } from '../components/pages/operations/statistics/statistic.directive';

@Injectable()
export class StatisticService {
    private url: string = `${environment.URL_SERVER}/reportes`;

    constructor(private _httpClient: HttpClient, private statisticDirective: StatisticDirective) { }

    private handleError(error) {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
            //error client server
            errorMsg = `Error: ${error.error.message}`;
        } else {
            errorMsg = `Error: ${error.error.message}`;
        }
        return throwError(errorMsg);
    }

    getOptionsReports(): any[]{
        return this.statisticDirective.getOptionsReports();
    }

    getHeaderReport(typeReport: number): any[]{
        return this.statisticDirective.getHeaderTable()[(typeReport - 1)];
    }

    getReport(req: any): Observable<any[]>{
        return <Observable<any[]>>this._httpClient.get(`${this.url}?reporte=${req.report}&fechaDesde=${req.from}&fechaHasta=${req.to}`).pipe(
            retry(0),
            catchError(this.handleError)
          )
    }
}
