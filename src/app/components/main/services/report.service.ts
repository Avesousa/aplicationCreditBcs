import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Report, DataReport } from '../models/report.model';

@Injectable()
export class ReportService {
  private url: string = `${environment.URL_SERVER}/informe`;

  constructor(private _httpClient: HttpClient) { }

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

  public getReport(request: DataReport): Observable<Report[]> {
    return <Observable<Report[]>>this._httpClient.post(`${this.url}/reporte`, request).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  public searchClient(query): Observable<Report[]> {
    return <Observable<Report[]>>this._httpClient.post(`${this.url}/buscar-persona`,query).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }
}
