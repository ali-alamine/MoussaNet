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
  contryForCentral$ : any;
  items : any;
  clients : any;
  private sub;
  public sellForm;
  public centralForm;
  public clientDebitForm;
  public clientForm;
  modalReference: any;
  public date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  countrys = [];

  constructor(private modalService: NgbModal,
    private route: ActivatedRoute,
    private sellService: SellService,
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private router: Router,
    private clientsService:ClientsService ){ }
  ngOnInit() {

    this.sellForm = this.fb.group({
      clientID: '',
      searchItem:'',
      bar_code: ['', Validators.required],
      date:this.date
    });
    this.centralForm = this.fb.group({
      country: ['', Validators.required],
      mins: ['', Validators.required],
      cost_mins: ['', Validators.required],
      price: ['', Validators.required],
      date:this.date
    });
    this.clientDebitForm = this.fb.group({
      clientID: [''],
      searchClient: '',
      clientName: ['']
    });
    this.countrys=this.sellService.getCountry();
    this.onItemNameChange();
    this.onClientNameChange();
    // this.onContryNameChange();
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
    this.clientDebitForm.get('clientID').setValue(id);
  }
  
  searchItemChange(name,price,bar_code){
    this.sellForm.get('searchItem').setValue('');
    this.sellForm.get('bar_code').setValue(bar_code);
  }
  getSearchedItems(){
    const formValue = this.sellForm.value;
    this.sellService.searchItem(formValue['bar_code']).subscribe(
        sellServices => this.itemForSell$ = sellServices 
    );
    this.items= this.itemForSell$;
    return this.itemForSell$;
  }
  addSell(){
    const formValue = this.clientDebitForm.value;
    if(formValue['clientID']=="" || formValue['clientName']==""){
      this.sellForm.get('clientID').setValue(1);
    }else{
      this.sellForm.get('clientID').setValue(formValue['clientID']);
    }
    this.sellService.addSell(this.sellForm.value).subscribe(Response => {
    this.sellForm = this.fb.group({
      clientID: '',
      searchItem:'',
      bar_code: ['', Validators.required],
      date:this.date
    });
      this.clientDebitForm.reset();
    }, error => {
      alert(error)
    });
  }
  addSellCentral(){
    // debugger
    const formValue = this.centralForm.value;
    this.sellService.addSellCentral(this.centralForm.value).subscribe(Response => {
    }, error => {
      alert(error)
    });
    this.centralForm.reset();
    this.centralForm.get('date').setValue(this.date);
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
    }, error => {
      alert(error)
    });
    this.modalReference.close();
    document.getElementById("searchClient").focus();
  }
  clearForm(){
    this.clientForm.resetForm();
  }
  get itemName() {
  return this.sellForm.get('itemName');
  }  
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
  get mins() {
    return this.centralForm.get('mins');
  }
  get cost_mins() {
    return this.centralForm.get('cost_mins');
  }
  get country() {
    return this.centralForm.get('country');
  }
  get price() {
    return this.centralForm.get('price');
  }
}

