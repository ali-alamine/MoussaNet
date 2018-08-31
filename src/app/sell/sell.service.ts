import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellService {
  
  private url="http://localhost/MoussaNet/src/assets/api/sell/";
  constructor(private httpClient: HttpClient) { }

  searchItem(searchInput){
    console.log(searchInput);
    // return this.httpClient.get('http://localhost/MoussaNet/src/assets/api/stock/serachItem'+searchInput);
  }
}
