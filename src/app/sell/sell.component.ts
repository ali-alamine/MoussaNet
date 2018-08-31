import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '../../../node_modules/@angular/material';
import { NgbModal } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormControl } from '../../../node_modules/@angular/forms';
import { SellService } from './sell.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  // private cashForm;
  itemForSell$ : any;
  item : any;

  constructor(private modalService: NgbModal,
    private sellService: SellService,
    private fb: FormBuilder,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
  }
  getSearchedItems(){
    // const formValue = this.cashForm.value;
    
    // console.log(formValue['clientName'])
    // this.sellService.searchItem('item').subscribe(
    //     sellServices => this.itemForSell$ = sellServices 
    // );
    // this.item= this.itemForSell$;
    // return this.itemForSell$;
}
// ngOnDestroy() {
//   this.sub.unsubscribe();
// }
}
