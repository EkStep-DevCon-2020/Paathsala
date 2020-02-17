import { Injectable } from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  public getData(url: any, options = {}): Observable < any > {
    return this.httpClient.get(url,options);
  }

  public post(url, body, httpOptions){
    return this.httpClient.post(url, body, httpOptions);
  }
}
