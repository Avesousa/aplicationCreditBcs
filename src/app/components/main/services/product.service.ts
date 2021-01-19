import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ProductService {
  private url: string = `${environment.URL_SERVER}/producto`;
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

  public createProduct(_product: Product): Observable<any> {
    return this._httpClient.post(this.url, _product, { headers: this.header }).pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  public getProductList(): Observable<Product[]> {
    return <Observable<Product[]>>this._httpClient.get(this.url).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  public deleteProduct(_product: Product) {
    return this._httpClient.delete(`${this.url}/${_product.codigo}`).pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  public updateProduct(_product: Product) {
    return this._httpClient.put(this.url, _product, { headers: this.header }).pipe(
      retry(0),
      catchError(this.handleError)
    );
  }
}
