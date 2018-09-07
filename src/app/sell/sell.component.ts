import { Component, OnInit, Input } from '@angular/core';
import { MatTabChangeEvent } from '../../../node_modules/@angular/material';
import { NgbModal } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '../../../node_modules/@angular/forms';
import { SellService } from './sell.service';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { ClientsService } from '../clients/clients.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  show=false;
  panelOpenState = false;
  itemForSell$ : any;
  items : any;
  clients : any;
  rechargeCard:any;
  private sub;
  public fullCardForm;
  public offersForm;
  public creditTransfersForm;
  public centralForm;
  
  accessoriesForm: FormGroup;
  options;
  newItemForm: FormGroup;
  public clientDebitForm;
  public clientForm;
  modalReference: any;
  countrys = [];

  constructor(private modalService: NgbModal,
    private route: ActivatedRoute,
    private sellService: SellService,
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private router: Router,
    private clientsService:ClientsService ){ }
  ngOnInit() {

    this.fullCardForm = this.fb.group({
      clientID: '',
      itemID:'',
      searchBarCode:'',
      cardName: ['', Validators.required],
      quantity:['', Validators.required],
      price: ['', Validators.required],
      profit:''
    });
    this.offersForm = this.fb.group({
      clientID:'',
      itemID:'',
      searchBarCode:'',
      company: ['', Validators.required],
      credits: ['', Validators.required],
      price: ['', Validators.required]
    })
    this.creditTransfersForm = this.fb.group({
      clientID:'',
      itemID:'',
      company:['', Validators.required],
      credits:['', Validators.required],
      price: ['', Validators.required]
    })
    this.accessoriesForm = this.fb.group({
      clientID:'',
      searchBarCode: '',
      itemID:'',
      totalPrice:['', Validators.required],
      items: this.fb.array([])
    });
    this.onAccessoriesNameChange();
    this.addItem();
    this.centralForm = this.fb.group({
      country: ['', Validators.required],
      mins: ['', Validators.required],
      price: ''
    });
    this.clientDebitForm = this.fb.group({
      clientID: [''],
      searchClient: '',
      clientName: ['']
    });
    this.countrys=this.sellService.getCountry();
    // this.onItemNameChange();
    this.onClientNameChange();
    this.getRechargeCard();

  }
  getRechargeCard(){
    this.sellService.getRechargeCard().subscribe(Response=>{
      console.log(Response)
        this.rechargeCard=Response;
      })
  }
  selectRechargeCard(id,price,cost){
      this.fullCardForm.get('searchBarCode').setValue('');
      this.fullCardForm.get('itemID').setValue(id);
      this.fullCardForm.get('quantity').setValue(1);
      this.fullCardForm.get('price').setValue(price);
      var profit= price-cost;
      this.fullCardForm.get('profit').setValue(profit);

  }
  addItem() {
    const item = this.fb.group({
      itemName: [],
      itemQunatity: [1, Validators.required],
      itemTotal: ['', Validators.required],
    });
    this.itemsForm.push(item);
  }
  deleteItem(i) {
    this.itemsForm.removeAt(i);
    // this.onChanges();
  }
  tabKey(data){
    if(data==this.itemsForm.length-1)
      this.addItem();
  }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if(tabChangeEvent.index==0){
      // this.centralForm.get('country').setValue('');
      // this.centralForm.get('mins').setValue(0);
      // this.centralForm.get('cost_mins').setValue(0);
      // this.centralForm.get('price').setValue('');
      // this.panelOpenState = false;

    }
    if(tabChangeEvent.index==1){
      // this.clientDebitForm.get('searchClient').setValue('');
      // this.clientDebitForm.get('clientID').setValue('');
      // this.clientDebitForm.get('clientName').setValue('');
      // this.sellForm.get('clientID').setValue('');
      // this.sellForm.get('searchItem').setValue('');
      // this.sellForm.get('bar_code').setValue('');
      // this.panelOpenState = false;
    }
  }
  // onItemNameChange():void{
  //   this.sellForm.get('searchItem').valueChanges.subscribe(val => {
  //     var data = this.sellForm.get('searchItem').value;
  //     if(data=="")
  //     {
  //       this.items=[];
  //       return;
  //     }
  //   this.sellService.searchItem(data).subscribe(Response=>{
  //       this.items=Response;
  //     })
  //   });
  // }
  onAccessoriesNameChange(): void {
    // this.supplyForm.get('searchSupplier').valueChanges.subscribe(val => {
    //   var data = this.supplyForm.get('searchSupplier').value;
    //   if (data == "") {
    //     this.options = [];
    //     return;
    //   }
    //   this.supplyService.searchSupplier(data).subscribe(Response => {
    //     this.options = Response;
    //   })
    // });
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
  // searchItemChange(name,price,bar_code){
  //   this.sellForm.get('searchItem').setValue('');
  //   this.sellForm.get('bar_code').setValue(bar_code);
  // }
  // getSearchedItems(){
  //   const formValue = this.sellForm.value;
  //   this.sellService.searchItem(formValue['bar_code']).subscribe(
  //       sellServices => this.itemForSell$ = sellServices 
  //   );
  //   this.items= this.itemForSell$;
  //   return this.itemForSell$;
  // }
  // addSell(){
  //   const formValue = this.clientDebitForm.value;
  //   const formValueSell = this.sellForm.value;
  //   if(formValue['clientID']=="" || formValue['clientName']==""){
  //     this.sellForm.get('clientID').setValue(1);
  //   }else{
  //     this.sellForm.get('clientID').setValue(formValue['clientID']);
  //   }
  //   if(formValueSell['bar_code']!=""){
  //     this.sellService.addSell(this.sellForm.value).subscribe(Response => {
  //     }, error => {
  //       alert(error)
  //     });
  //     this.clientDebitForm.get('searchClient').setValue('');
  //     this.clientDebitForm.get('clientID').setValue('');
  //     this.clientDebitForm.get('clientName').setValue('');
  //     this.sellForm.get('clientID').setValue('');
  //     this.sellForm.get('searchItem').setValue('');
  //     this.sellForm.get('bar_code').setValue('');
  //     this.panelOpenState = false;
  //   }
  // }
  sellCentral(){
    const formValue = this.centralForm.value;
    this.sellService.addSellCentral(this.centralForm.value).subscribe(Response => {
    }, error => {
      alert(error)
    });
    this.centralForm.get('country').setValue('');
    this.centralForm.get('mins').setValue(0);
    this.centralForm.get('cost_mins').setValue(0);
    this.centralForm.get('price').setValue('');
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
  get searchBarCodeFullCard() {
  return this.fullCardForm.get('searchBarCode');
  } 
  get cardName() {
    return this.fullCardForm.get('cardName');
  } 
  get quantityFullCard() {
    return this.fullCardForm.get('quantity');
  }  
  get priceFullCard() {
    return this.fullCardForm.get('price');
  } 
  get searchBarCodeDays() {
    return this.offersForm.get('searchBarCode');
  } 
  get companyDays() {
      return this.offersForm.get('company');
  } 
  get creditsDays() {
    return this.offersForm.get('credits');
  }
  get priceDays() {
    return this.offersForm.get('price');
  } 
   
  get companyCreditTransfers() {
    return this.creditTransfersForm.get('company');
  } 
  get creditscreditTransfers() {
    return this.creditTransfersForm.get('credits');
  }
  get pricecreditTransfers() {
    return this.creditTransfersForm.get('price');
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
  get country() {
    return this.centralForm.get('country');
  }
  get itemsForm() {
    return this.accessoriesForm.get('items') as FormArray
  }
  // get price() {
  //   return this.centralForm.get('price');
  // }
}

