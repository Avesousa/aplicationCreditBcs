import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Branch } from '../models/branch.model';

@Injectable()
export class BranchService {
  private url: string = `${environment.URL_SERVER}/sucursal`;
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

  
  public createBranch(_branch: Branch): Observable<any> {
    return this._httpClient.post(this.url, _branch, { headers: this.header }).pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  public getBranchList(): Observable<Branch[]> {
    return <Observable<Branch[]>>this._httpClient.get(this.url).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  public deleteBranch(_branch: Branch) {
    return this._httpClient.delete(`${this.url}/${_branch.numero}`).pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  public updateBranch(_branch: Branch) {
    return this._httpClient.put(this.url, _branch, { headers: this.header }).pipe(
      retry(0),
      catchError(this.handleError)
    );
  }
}
