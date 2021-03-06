import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UserService {
  private URL_USER: string = `${environment.URL_SERVER}/user`;
  private URL_LOGOUT: string = `${environment.URL_SERVER}/logout`;

  constructor(private _httpClient: HttpClient) { }

  public getUser() {
    return this._httpClient.get(this.URL_USER);
  }

  public logout() {
    return this._httpClient.get(this.URL_LOGOUT);
  }
}
