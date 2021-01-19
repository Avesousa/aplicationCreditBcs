import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";
import { Agreement } from "../models/agreement.model";

@Injectable()
export class AgreementService {
    private url: string = `${environment.URL_SERVER}/acuerdos`;
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

    public getAgreementList(req: any): Observable<Agreement[]> {
        return <Observable<Agreement[]>>this._httpClient.post(this.url,req).pipe(
            retry(0),
            catchError(this.handleError)
        );
    }

    public sendLetter(){
        setTimeout(()=>{
            console.log("envio carta");
        },5000)
    }

    public updateAgreement(agreement: Agreement){
        return this._httpClient.put(this.url,agreement).pipe(
            retry(0),
            catchError(this.handleError)
        );
    }

    public getMotive(agreement: Agreement): Observable<string>{
        return <Observable<string>>this._httpClient.post(`${this.url}/motivoRechazo`, agreement).pipe(
            retry(0),
            catchError(this.handleError)
        );
    }

}