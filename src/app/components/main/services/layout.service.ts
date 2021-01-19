import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Period } from '../models/period.model';

@Injectable()
export class LayoutService {
  isSidebarCollapsed: boolean = false;
  private url: string = `${environment.URL_SERVER}`;
  private header = new HttpHeaders({ 'content-Type': 'application/json' });

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

  getLastPeriod(): Observable<string[]> {
    return <Observable<string[]>>this._httpClient.get(this.url + '/ultimosPeriodos').pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  getLastMonths(): Observable<Period[]> {
    return <Observable<Period[]>>this._httpClient.get(this.url + '/ultimosMeses').pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  getPeriods(): Observable<string[]> {
    return <Observable<string[]>>this._httpClient.get(this.url + '/periodos').pipe(
      retry(0),
      catchError(this.handleError)
    );
  }
}
