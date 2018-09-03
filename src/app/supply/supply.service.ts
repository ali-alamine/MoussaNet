import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SupplyService {
  private url="http://localhost/MoussaNet/src/assets/api/supply/";
  constructor(private httpClient: HttpClient) {}

   searchSupplier(data):Observable<any>{
    return this.httpClient.get(this.url+"searchSupplier", {params:{keyword:data}});
  }
}