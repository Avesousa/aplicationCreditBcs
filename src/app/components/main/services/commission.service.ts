import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Commission } from '../models/commission.model';
import { environment } from '../../../../environments/environment';
import { Observable, throwError} from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class CommissionService {
  private url: string = `${environment.URL_SERVER}/fechaEnvio`;
  private header = new HttpHeaders({ 'content-Type': 'application/json' });

  constructor(private _httpClient: HttpClient) {}

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

  public createCommission(_commission: Commission): Observable<any> {
    return this._httpClient.post(this.url, _commission, { headers: this.header }).pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  public getCommissionList(): Observable<Commission[]> {
    return <Observable<Commission[]>>this._httpClient.get(this.url + '/consulta').pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  public getCommissionListSupervisor(): Observable<Commission[]> {
    return <Observable<Commission[]>>this._httpClient.get(this.url + '/consultaSupervisor').pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  public isHoliday(date: Date): Observable<boolean> {
    return this._httpClient.post<boolean>(this.url + 'esFeriado', date).pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  public deleteCommission(_commission: Commission): Observable<any> {
    let date = moment(_commission.fecha).format('YYYYMMDD')
    return this._httpClient.delete(
      `${this.url} ?fecha=${date}&tipoArchivo=${_commission.tipoArchivo}&perfil=${_commission.perfil}`).pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  public updateCommission(_commission: Commission): Observable<any> {
   return this._httpClient.put(this.url, _commission, { headers: this.header }).pipe(
      retry(0),
      catchError(this.handleError)
    );
  }
}
