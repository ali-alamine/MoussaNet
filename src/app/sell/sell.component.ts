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
  offers:any;
  credits:any;
  showCredits:any;
  accessories:any;
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
      debit: false,
      clientID: '',
      itemID:'',
      searchBarCode:'',
      cardName: ['', Validators.required],
      quantity:['', Validators.required],
      price: ['', Validators.required],
      profit:''
    });
    this.offersForm = this.fb.group({
      debit:false,
      clientID:'',
      itemID:'',
      searchBarCode:'',
      company: ['', Validators.required],
      mounth: ['', Validators.required],
      credits: ['', Validators.required],
      price: ['', Validators.required]
    })
    this.creditTransfersForm = this.fb.group({
      debit:false,
      clientID:'',
      company:['', Validators.required],
      credits:['', Validators.required],
      price: ['', Validators.required]
    })
    this.accessoriesForm = this.fb.group({
      clientID:'',
      searchAccessories: '',
      items: this.fb.array([])
    });
    this.centralForm = this.fb.group({
      country: ['', Validators.required],
      mins: ['', Validators.required],
      price: ['',Validators.required]
    });
    this.clientDebitForm = this.fb.group({
      clientID: [''],
      searchClient: '',
      clientName: ['']
    });
    this.countrys=this.sellService.getCountry();
    this.onAccessoriesNameChange();
    // this.addItem();
    this.onClientNameChange();
    this.onRechargeCardChange();
    this.onOffersChange();
    this.onCreditsTransfersChange();
    this.onItemNameChange();
    this.getRechargeCard();
    this.getOffers();
    this.getCreditsTransfers();
    // this.getAccessories();

  }
  onItemNameChange(): void {
    this.accessoriesForm.get('searchAccessories').valueChanges.subscribe(val => {
      var data = this.accessoriesForm.get('searchAccessories').value;
      if (data == "") {
        this.accessories = [];
        return;
      }
      this.sellService.searchAccessories(data).subscribe(Response => {
        this.accessories = Response;
        // console.log(this.accessories)
      })
    });
  }
  onAccessories
  onRechargeCardChange(): void {
    this.fullCardForm.get('searchBarCode').valueChanges.subscribe(val => {
      var data = this.fullCardForm.get('searchBarCode').value;
      for(var i=0;i<this.rechargeCard.length;i++){
        if(this.rechargeCard[i].bar_code==data){
          this.fullCardForm.get('searchBarCode').setValue('');
          this.fullCardForm.get('itemID').setValue(this.rechargeCard[i].IID);
          this.fullCardForm.get('cardName').setValue(this.rechargeCard[i].name);
          this.fullCardForm.get('quantity').setValue(1);
          this.fullCardForm.get('price').setValue(this.rechargeCard[i].price);
          var profit= this.rechargeCard[i].price-this.rechargeCard[i].cost;
          this.fullCardForm.get('profit').setValue(profit);
        }
      }
    });
  }
  onOffersChange(): void {
    this.offersForm.get('searchBarCode').valueChanges.subscribe(val => {
      var data = this.offersForm.get('searchBarCode').value;
      for(var i=0;i<this.offers.length;i++){
        if(this.offers[i].bar_code==data){
          this.offersForm.get('searchBarCode').setValue('');
          this.offersForm.get('itemID').setValue(this.offers[i].IID);
          this.offersForm.get('company').setValue(this.offers[i].company);
          this.offersForm.get('mounth').setValue(this.offers[i].num_of_mounth);
          this.offersForm.get('credits').setValue(this.offers[i].num_of_credit);
          this.offersForm.get('price').setValue(this.offers[i].price);
        }
      }
    });
  }
  onCreditsTransfersChange(): void {
    this.creditTransfersForm.get('company').valueChanges.subscribe(val => {
      this.changePriceCreditsTransfers();
    });
    this.creditTransfersForm.get('credits').valueChanges.subscribe(val => {
      this.changePriceCreditsTransfers();
    });
  }
  changePriceCreditsTransfers(){
    var company = this.creditTransfersForm.get('company').value;
    var credits = this.creditTransfersForm.get('credits').value;
    this.creditTransfersForm.get('price').setValue('');
    for(var i=0;i<this.credits.length;i++){
      if(this.credits[i].company==company && this.credits[i].num_of_credit==credits){
        this.creditTransfersForm.get('price').setValue(this.credits[i].price);
      }
    }
    
  }
  getRechargeCard(){
    this.sellService.getRechargeCard().subscribe(Response=>{
      console.log(Response)
        this.rechargeCard=Response;
      })
  }
  getOffers(){
    this.sellService.getOffers().subscribe(Response=>{
      console.log(Response)
        this.offers=Response;
      })
  }
  // getAccessories(){
  //   this.sellService.getAccessories().subscribe(Response=>{
  //     console.log(Response)
  //       this.accessories=Response;
  //     })
  // }
  getCreditsTransfers(){
    this.sellService.getCreditsTransfers().subscribe(Response=>{
      console.log(Response)
        this.credits=Response;
      })
  }
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
    // console.log(this.clientDebitForm.value)
  }
  selectRechargeCard(id,price,cost){
    this.fullCardForm.get('searchBarCode').setValue('');
    this.fullCardForm.get('itemID').setValue(id);
    this.fullCardForm.get('quantity').setValue(1);
    this.fullCardForm.get('price').setValue(price);
    var profit= price-cost;
    this.fullCardForm.get('profit').setValue(profit);

  }
  addItem(name) {
    const item = this.fb.group({
      itemName: [name],
      itemID: [''],
      itemQunatity: [1, Validators.required],
      itemTotal: ['', Validators.required],
    });
    this.itemsForm.push(item);
    console.log(this.itemsForm.value)
  }
  deleteItem(i) {
    this.itemsForm.removeAt(i);
    // this.onChanges();
  }
  test(id, name,price) {
    this.accessoriesForm.get('searchAccessories').setValue('');
        // var profit=this.accessories[i].price-this.accessories[i].cost;
        const item = this.fb.group({
          name: [name],
          itemID: [id],
          quantity: [1, Validators.required],
          profit:'',
          price: [price, Validators.required],
        });
        this.itemsForm.push(item);
        console.log(this.itemsForm.value)
  }
  // tabKey(data){
  //   if(data==this.itemsForm.length-1)
  //     this.addItem();
  // }
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
  sellFullCard(){
    const fullCardformValue = this.fullCardForm.value;
    const clientDebitformValue = this.clientDebitForm.value;
    if(fullCardformValue['debit']==true && clientDebitformValue['clientID']!='')
      fullCardformValue['clientID']=clientDebitformValue['clientID'];
    else
      fullCardformValue['clientID']=1;
    this.sellService.sellFullCard(this.fullCardForm.value).subscribe(Response => {
    }, error => {
      alert(error)
    });
    this.fullCardForm.get('searchBarCode').setValue('');
    this.fullCardForm.get('itemID').setValue('');
    this.fullCardForm.get('clientID').setValue('');
    this.fullCardForm.get('cardName').setValue('');
    this.fullCardForm.get('quantity').setValue('');
    this.fullCardForm.get('price').setValue('');
    this.fullCardForm.get('profit').setValue('');
    this.fullCardForm.get('debit').setValue(false);
    this.clientDebitForm.get('searchClient').setValue('');
    this.clientDebitForm.get('clientName').setValue('');
    this.clientDebitForm.get('clientID').setValue('');
  }
  sellOffers(){
    const offersformValue = this.offersForm.value;
    const clientDebitformValue = this.clientDebitForm.value;
    if(offersformValue['debit']==true && clientDebitformValue['clientID']!='')
      offersformValue['clientID']=clientDebitformValue['clientID'];
    else
      offersformValue['clientID']=1;
    this.sellService.sellOffers(this.offersForm.value).subscribe(Response => {
    }, error => {
      alert(error)
    });
    this.offersForm.get('searchBarCode').setValue('');
    this.offersForm.get('itemID').setValue('');
    this.offersForm.get('clientID').setValue('');
    this.offersForm.get('company').setValue('');
    this.offersForm.get('mounth').setValue('');
    this.offersForm.get('credits').setValue('');
    this.offersForm.get('price').setValue('');
    this.offersForm.get('debit').setValue(false);
    this.clientDebitForm.get('searchClient').setValue('');
    this.clientDebitForm.get('clientName').setValue('');
    this.clientDebitForm.get('clientID').setValue('');
  }
  sellCreditTransfers(){
    const creditTransfersFormValue = this.creditTransfersForm.value;
    const clientDebitformValue = this.clientDebitForm.value;
    if(creditTransfersFormValue['debit']==true && clientDebitformValue['clientID']!='')
      creditTransfersFormValue['clientID']=clientDebitformValue['clientID'];
    else
      creditTransfersFormValue['clientID']=1;
    this.sellService.sellCreditTransfers(this.creditTransfersForm.value).subscribe(Response => {
    }, error => {
      alert(error)
    });
    this.creditTransfersForm.get('clientID').setValue('');
    this.creditTransfersForm.get('company').setValue('');
    this.creditTransfersForm.get('credits').setValue('');
    this.creditTransfersForm.get('price').setValue('');
    this.creditTransfersForm.get('debit').setValue(false);
    this.clientDebitForm.get('searchClient').setValue('');
    this.clientDebitForm.get('clientName').setValue('');
    this.clientDebitForm.get('clientID').setValue('');
  }
  sellAccessories(){

  }
  sellCentral(){
    const formValue = this.centralForm.value;
    this.sellService.addSellCentral(this.centralForm.value).subscribe(Response => {
    }, error => {
      alert(error)
    });
    this.centralForm.get('country').setValue('');
    this.centralForm.get('mins').setValue('');
    this.centralForm.get('price').setValue('');
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
   
  get mounthDays() {
    return this.offersForm.get('mounth');
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
  
  get price() {
    return this.centralForm.get('price');
  }
  get itemsForm() {
    return this.accessoriesForm.get('items') as FormArray
  }
  // get price() {
  //   return this.centralForm.get('price');
  // }
}

