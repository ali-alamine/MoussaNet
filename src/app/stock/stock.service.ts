import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private url="http://localhost/MoussaNet/src/assets/api/stock/";
  constructor(private httpClient: HttpClient) { }
  addNewAcc(accData): Observable<any>{
    return this.httpClient.post(this.url+"stockAcc", accData);
  }
  addNewMRC(MRCData): Observable<any>{
    return this.httpClient.post(this.url+"stockMRC", MRCData);
  }
  editAcc(data): Observable<any> {
    return this.httpClient.put(this.url+"stockMRC", data);
  }
  editMRC(data): Observable<any> {
    return this.httpClient.put(this.url+"stockAcc", data);
  }
  
  // autoSubscription():Observable<any>{
  //   return this.httpClient.get(this.url+"autoSubscription");
  // }
}
