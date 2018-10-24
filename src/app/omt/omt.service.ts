import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OmtService {

  private url = "http://localhost/MoussaNet/src/assets/api/omt/";

  constructor(private httpClient: HttpClient) { }

  searchClient(searchInput){
    return this.httpClient.get('http://localhost/MoussaNet/src/assets/api/sell/searchClient',{params:{searchInput:searchInput}});
  }
}
