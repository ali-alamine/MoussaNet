import { Component, OnInit, Input } from '@angular/core';
import { MatTabChangeEvent } from '../../../node_modules/@angular/material';
import { NgbModal } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormControl } from '../../../node_modules/@angular/forms';
import { SellService } from './sell.service';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { ClientsService } from '../clients/clients.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  private cashForm;
  itemForSell$ : any;
  items : any;
  clients : any;
  private sub;
  private sellForm;
  private clientDebitForm;
  private clientForm;
  modalReference: any;

  constructor(private modalService: NgbModal,
    private route: ActivatedRoute,
    private sellService: SellService,
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private router: Router,
    private clientsService:ClientsService) { }

  ngOnInit() {
    var date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    console.log(date)
    this.sellForm = this.fb.group({
      itemID: '',
      searchItem:'',
      itemName: ['', Validators.required],
      price: '',
      date:date,
      type:''
    });
    this.clientDebitForm = this.fb.group({
      clientID: [''],
      searchClient: '',
      clientName: [''],
      clientPhone: [''],
      debit: ['']
    });
    // document.getElementById("searchItem").focus();

    this.onItemNameChange();
    this.onClientNameChange();
  }
  onItemNameChange():void{
    this.sellForm.get('searchItem').valueChanges.subscribe(val => {
      var data = this.sellForm.get('searchItem').value;
      if(data=="")
      {
        this.items=[];
        return;
      }
    this.sellService.searchItem(data).subscribe(Response=>{
        this.items=Response;
      })
    });
  }
  onClientNameChange():void{
    this.clientDebitForm.get('searchClient').valueChanges.subscribe(val => {
      var data = this.clientDebitForm.get('searchClient').value;
      if(data=="")
      {
        this.clients=[];
        return;
      }
    this.sellService.searchClient(data).subscribe(Response=>{
        this.clients=Response;
      })
    });
  }
  searchClientChange(id,name,phone){
    this.clientDebitForm.get('searchClient').setValue('');
    this.clientDebitForm.get('clientName').setValue(name);
    this.clientDebitForm.get('clientPhone').setValue(phone);
    this.clientDebitForm.get('clientID').setValue(id);
  }
  
  searchItemChange(id,name,price,type){
    this.sellForm.get('searchItem').setValue('');
    this.sellForm.get('itemName').setValue(name);
    this.sellForm.get('itemID').setValue(id);
    this.sellForm.get('price').setValue(price);
    this.sellForm.get('type').setValue(type);
    // console.log(this.sellForm.value)
  }
  getSearchedItems(){
    const formValue = this.sellForm.value;
    console.log(formValue['itemName'])
    this.sellService.searchItem(formValue['itemName']).subscribe(
        sellServices => this.itemForSell$ = sellServices 
    );
    this.items= this.itemForSell$;
    return this.itemForSell$;
  }
  addSellCash(){
    this.sellService.addSell(this.sellForm.value).subscribe(Response => {
      // this.globalAccDataTable.ajax.reload(null, false);
      // alert(Response)
    }, error => {
      alert(error)
    });
    this.sellForm.value.clearForm;
    console.log(this.sellForm.value)
    // this.itemName.value='';
    // this.sellService.addSell(formValue['itemID']).subscribe(Response => {
    //   // this.globalAccDataTable.ajax.reload(null, false);
    //   alert(Response)
    // }, error => {
    //   alert(error)
    // });
    // }
  }
  openClientModal(clientModal){
    this.modalReference = this.modalService.open(clientModal, { centered: true, ariaLabelledBy: 'modal-basic-title' });
    var name = '';
    var phone = '';
    var address = '';
    this.clientForm = this.fb.group({
      name: [name, Validators.required],
      phone: [phone, Validators.required],
      address: [address, Validators.required]
    });
    document.getElementById("clientNameModal").focus();
  }
  addClient() {
    this.clientsService.addNewClient(this.clientForm.value).subscribe(Response => {
      // this.globalClientsDT.ajax.reload(null, false);
      // alert(Response)
    }, error => {
      alert(error)
    });
    this.modalReference.close();
    document.getElementById("searchClient").focus();
  }
  clearForm(){
    this.clientForm.resetForm();
  }
  searchSubmit(){
    console.log(this.clientForm.value);
  }
  get itemName() {
  return this.sellForm.get('itemName');
  }
  // get searchItem() {
  // return this.sellForm.get('searchItem');
  // }
  
  get name() {
    return this.clientForm.get('name');
  }
  get phoneNumber() {
    return this.clientForm.get('phone');
  }
  get address() {
    return this.clientForm.get('address');
  }
  get clientName() {
    return this.clientDebitForm.get('clientName');
  }
  get clientPhone() {
    return this.clientDebitForm.get('clientPhone');
  }
}

