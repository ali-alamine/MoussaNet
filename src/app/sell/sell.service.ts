import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellService {
  
  // private url="http://localhost/MoussaNet/src/assets/api/sell/";
  constructor(private httpClient: HttpClient) { }
  addSell(data): Observable<any>{
    // console.log(data);
    return this.httpClient.post('http://localhost/MoussaNet/src/assets/api/sell/sell', data);
  }
  // sellUpdateQuantity(data):Observable<any>{
  //   console.log(data);
  //   return this.httpClient.put('http://localhost/MoussaNet/src/assets/api/sell/sellUpdateQuantity', data);
  // }
  searchItem(searchInput){
    return this.httpClient.get('http://localhost/MoussaNet/src/assets/api/stock/searchItem',{params:{searchInput:searchInput}});
  }
  searchClient(searchInput){
    return this.httpClient.get('http://localhost/MoussaNet/src/assets/api/sell/searchClient',{params:{searchInput:searchInput}});
  }
}
