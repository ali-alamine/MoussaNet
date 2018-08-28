import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  private url="http://localhost/MoussaNet/src/assets/api/subscriber/";
  constructor(private httpClient: HttpClient) { }

  addNewSubscriber(subscriberData): Observable<any>{
    return this.httpClient.post(this.url+"subscriber", subscriberData);
  }

  editSubscriber(data): Observable<any> {
    return this.httpClient.put(this.url+"subscriber", data);
  }
  deleteClient(data):Observable<any>{
    console.log(data)
    return this.httpClient.put(this.url+"deleteClient", data);
  }
}
