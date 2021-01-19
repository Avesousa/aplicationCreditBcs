import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { environment } from '../../../../environments/environment';
import { FileGeneration } from "../models/fileGeneration.model";

@Injectable()
export class FileGenerationService{
    private url: string = `${environment.URL_SERVER}/generacionArchivo`;
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

    getListFiles(): Observable<FileGeneration[]>{
        return <Observable<FileGeneration[]>>this._httpClient.get(this.url).pipe(
            retry(0),
            catchError(this.handleError)
        );
    }

    sendFiles(){
        return this._httpClient.post(this.url,this.header).pipe(
            retry(0),
            catchError(this.handleError)
        )
    }
}
