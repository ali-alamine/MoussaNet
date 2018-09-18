import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileDrawerService {

  private url="http://localhost/MoussaNet/src/assets/api/drawer/";
  constructor(private httpClient: HttpClient) { }

  getMobileDrawer():Observable<any>{
    return this.httpClient.get(this.url+"mobileDrawer");
  }

  
  newPayment(paymentData): Observable<any>{
    return this.httpClient.put(this.url+"payment", paymentData);
  }

}
