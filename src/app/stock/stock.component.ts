import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '../../../node_modules/@angular/material';
import { NgbModal } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormControl } from '../../../node_modules/@angular/forms';
declare var $: any;
import 'datatables.net';
import 'datatables.net-bs4';
import { MenuItem } from '../../../node_modules/primeng/api';
import { StockService } from './stock.service';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  // @ViewChild('tabGroup') tabGroup;
  private accItems: MenuItem[];
  private MRCItems: MenuItem[];
  private globalAccDataTable;
  private globalMRCDataTable;
  private globalMCDataTable;
  private static selectedRowDataAcc;
  private static selectedRowDataMRC;
  private static selectedRowDataMC;
  private static selectedAccID: number;
  private static selectedMRCID: number;
  private static selectedMCID: number;
  private accForm;
  private MRCForm;
  private MCForm;
  modalReference: any;
  private accModalTitle;
  private accModalType;
  private MRCModalTitle;
  private MRCModalType;
  disableSelect = new FormControl(false);
  accEdit = true;
  MRCEdit = true;
  cartIsOffers = true;
  accEditedData = {};
  MRCEditedData = {};

  constructor(private modalService: NgbModal,
  private fb: FormBuilder,
  private stockService: StockService) { }
  ngOnInit() {

    this.accItems = [{
      label: 'Edit',
      icon: 'pi pi-fw pi-pencil',
      command: (event) => {
        let element: HTMLElement = document.getElementById('accEditBtn') as HTMLElement;
        element.click();
      }
      },
      {
      label: 'Delete',
      icon: 'pi pi-fw pi-trash',
      command: (event) => {
        let element: HTMLElement = document.getElementById('accDelBtn') as HTMLElement;
        element.click();
      }
    }];
    this.MRCItems = [{
      label: 'Edit',
      icon: 'pi pi-fw pi-pencil',
      command: (event) => {
        let element: HTMLElement = document.getElementById('MRCEditBtn') as HTMLElement;
        element.click();
      }
  
      },
      {
      label: 'Delete',
      icon: 'pi pi-fw pi-trash',
      command: (event) => {
        let element: HTMLElement = document.getElementById('MRCDelBtn') as HTMLElement;
        element.click();
      }
    }];
    // this.viewStockAccDT();
  }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if(tabChangeEvent.index==0){
      //stockAccDT
      this.viewStockAccDT();
    }
    if(tabChangeEvent.index==1){
      //stockMRCDT
      this.viewStockMRCDT();
    }
    if(tabChangeEvent.index==2){
      //stockMCDT
      this.viewStockMCDT();
    }
    // console.log('tabChangeEvent => ', tabChangeEvent);
    // console.log('index => ', tabChangeEvent.index);
  }
  viewStockAccDT(){
    if(this.globalAccDataTable==null){
      // debugger
    var stockAccDT = $('#stockAccDT').DataTable({
      buttons: ["print"],
      responsive: false,
      paging: true,
      pagingType: "full_numbers",
      serverSide: true,
      processing: true,
      ordering: true,
      stateSave: true,      
      autoWidth: true,
      select: {
        "style": "single"
      },
      searching: true,
      lengthMenu: [[5, 10, 25, 50, 100, 150, 200, 300], [5, 10, 25, 50, 100, 150, 200, 300]],
      ajax: {
        type: "get",
        url: "http://localhost/MoussaNet/src/assets/api/dataTables/stockDataTable.php",
        data:{"type":"AC"},
        cache: false,
        async: true
      },
      order: [[0, 'asc']],
      columns: [
        { data: "name", title: "NAME" },
        { data: "quantity", title: "QUANTITY" },
        { data: "price", title: "PRICE" }
      ]
    });
    this.globalAccDataTable=stockAccDT;
    stockAccDT.on('select', function (e, dt, type, indexes) {
      if (type === 'row') {
        StockComponent.selectedRowDataAcc = stockAccDT.row(indexes).data();
        var data = stockAccDT.row(indexes).data()['ID'];
        StockComponent.selectedAccID = data;
      }
      else if (type === 'column') {
      StockComponent.selectedAccID = -1;
      }
    });
    $('#stockAccDT tbody').on('mousedown', 'tr', function (event) {
      if (event.which == 3) {
        stockAccDT.row(this).select();
      }
    });
    $('#stockAccDT').on('key-focus.dt', function (e, datatable, cell) {
      $(stockAccDT.row(cell.index().row).node()).addClass('selected');
    });
    $('#stockAccDT').on('key-blur.dt', function (e, datatable, cell) {
      $(stockAccDT.row(cell.index().row).node()).removeClass('selected');
    });
    }else{
      this.globalAccDataTable.ajax.reload(null, false);
    }
  }
  viewStockMRCDT(){
    if(this.globalMRCDataTable==null){
      // debugger
      var stockMRCDT = $('#stockMRCDT').DataTable({
        buttons: ["print"],
        responsive: false,
        paging: true,
        pagingType: "full_numbers",
        serverSide: true,
        processing: true,
        ordering: true,
        stateSave: true,      
        autoWidth: true,
        select: {
          "style": "single"
        },
        searching: true,
        lengthMenu: [[5, 10, 25, 50, 100, 150, 200, 300], [5, 10, 25, 50, 100, 150, 200, 300]],
        ajax: {
          type: "get",
          url: "http://localhost/MoussaNet/src/assets/api/dataTables/stockDataTable.php",
          data:{"type":"RC"},
          cache: false,
          async: true
        },
        order: [[0, 'asc']],
        columns: [
          { data: "name", title: "CARD NAME" },
          { data: "card_company", title: "TYPE" },
          { data: "quantity", title: "QUANTITY","searchable": false,"sortable": false,"render": function (data,meta,row) {
              if(data==""){ return "---";} else return data;} },
          { data: "price", title: "PRICE","searchable": false,"sortable": false },
          { data: "is_offers", title: "IS OFFERS"}
          // ,"searchable": false,"sortable": true,"render": function (data,meta,row) {
          //   if(data==1){ return "<checkbox disabled='true'>Is Offers</checkbox>";} else return '';} }
  
        ],
        "columnDefs": [
          {
            "targets": 4,
            "data": "is_offers",
            "render": function (data, type, row, meta) {
              if (data == 1) {
                return 'Is Offers';
              }
              else if (data == 0) {
                return '';
              }
              else {
                return '';
              }
  
            }
          }]
      });
      this.globalMRCDataTable=stockMRCDT;
      stockMRCDT.on('select', function (e, dt, type, indexes) {
        if (type === 'row') {
          // debugger
          StockComponent.selectedRowDataMRC = stockMRCDT.row(indexes).data();
          var data = stockMRCDT.row(indexes).data()['ID'];
          StockComponent.selectedMRCID = data;
          // console.log(StockComponent.selectedRowDataMRC['is_offers'])
        }
        else if (type === 'column') {
        StockComponent.selectedMRCID = -1;
        }
      });
      $('#stockMRCDT tbody').on('mousedown', 'tr', function (event) {
        if (event.which == 3) {
          stockMRCDT.row(this).select();
        }
      });
      $('#stockMRCDT').on('key-focus.dt', function (e, datatable, cell) {
        $(stockMRCDT.row(cell.index().row).node()).addClass('selected');
      });
      $('#stockMRCDT').on('key-blur.dt', function (e, datatable, cell) {
        $(stockMRCDT.row(cell.index().row).node()).removeClass('selected');
      });
    } else{
      this.globalMRCDataTable.ajax.reload(null, false);
    }
  }
  viewStockMCDT(){    
    if(this.globalMCDataTable==null){
      var stockMCDT = $('#stockMCDT').DataTable({
        buttons: ["print"],
        responsive: false,
        paging: true,
        pagingType: "full_numbers",
        serverSide: true,
        processing: true,
        ordering: true,
        stateSave: false,      
        autoWidth: false,
        select: {
          "style": "single"
        },
        searching: false,
        ajax: {
          type: "get",
          url: "http://localhost/MoussaNet/src/assets/api/dataTables/stockDataTable.php",
          data:{"type":"CT"},
          cache: false,
          async: true
        },
        order: [[0, 'asc']],
        columns: [
          { data: "card_company", title: "$ CREDIT TYPE","searchable": false,"sortable": false },
          { data: "quantity", title: "AMOUNT","searchable": false,"sortable": false }

        ]
      });
      this.globalMCDataTable=stockMCDT;
    } else{
      this.globalMCDataTable.ajax.reload(null, false);
    }
  }
  openAccModal(accModal, edit) {
    this.modalReference = this.modalService.open(accModal, { centered: true, ariaLabelledBy: 'modal-basic-title' });
    var accName = '';
    var accPrice = '';
    var accBarCode = '';
    this.accModalTitle = "Add Accessories";
    this.accModalType = "Add";
    this.accEdit=false;

    if (edit == true) {
      this.accEdit=true;
      accName = StockComponent.selectedRowDataAcc['name'];
      accPrice = StockComponent.selectedRowDataAcc['price'];
      accBarCode = StockComponent.selectedRowDataAcc['bar_code'];
      this.accModalTitle = "Update Accessories";
      this.accModalType = "Update";
    }
    this.accForm = this.fb.group({
      name: [accName, Validators.required],
      price: [accPrice, Validators.required],
      bar_code: [accBarCode, Validators.required]
    });
  }
  openMRCModal(MRCModal, MRCEdit) {
    this.cartIsOffers=true;
    this.modalReference = this.modalService.open(MRCModal, { centered: true, ariaLabelledBy: 'modal-basic-title' });
    if (MRCEdit == true) {
      // console.log(MRCEdit)
      this.MRCEdit = true;
      this.MRCModalTitle = "Update MOBILE RECHARGE CARD";
      this.MRCModalTitle = "Update MOBILE RECHARGE CARD";
      this.MRCModalType = "Update";
      // console.log(StockComponent.selectedRowDataMRC['is_offers'])
      if(StockComponent.selectedRowDataMRC['is_offers']==0){
        this.MRCForm = this.fb.group({
          isOffer: [{value:false,disabled: true}],
          name: [StockComponent.selectedRowDataMRC['name'], Validators.required],
          quantity: StockComponent.selectedRowDataMRC['quantity'],
          price: StockComponent.selectedRowDataMRC['price'],
          bar_code: StockComponent.selectedRowDataMRC['bar_code']
        });
      }else if(StockComponent.selectedRowDataMRC['is_offers']==1){
        this.cartIsOffers=false;
        this.MRCForm = this.fb.group({
          isOffer: [{value:true, disabled: true}],
          name: [StockComponent.selectedRowDataMRC['name'], Validators.required],
          price: StockComponent.selectedRowDataMRC['price'],
          bar_code: StockComponent.selectedRowDataMRC['bar_code']
        });
      }
    } else{
      this.MRCEdit = false;
      this.MRCModalTitle = "ADD MOBILE RECHARGE CARD";
      this.MRCModalType = "Add";
      this.MRCForm = this.fb.group({
        isOffer: false,
        name: ['', Validators.required],
        type: ['', Validators.required],
        quantity: '',
        price: '',
        bar_code: ''
      });
    }
  }
  addEditAcc() {
    if (this.accEdit == true) {
      this.accEdit = true;
      this.accEditedData['name'] = this.accName.value;
      // this.accEditedData['quantity'] = this.accQuantity.value;
      this.accEditedData['price'] = this.accPrice.value;
      this.accEditedData['bar_code'] = this.accBarCode.value;
      this.accEditedData['IID'] = StockComponent.selectedAccID;
      this.stockService.editAcc(this.accEditedData).subscribe(Response => {
        this.globalAccDataTable.ajax.reload(null, false);
        // alert(Response);
      }, error => {
        console.log(error);
      });
    }
    else {
      this.accEdit = false;
      console.log(this.accForm.value)
      this.stockService.addNewAcc(this.accForm.value).subscribe(Response => {
        this.globalAccDataTable.ajax.reload(null, false);
        // alert(Response)
      }, error => {
        alert(error)
      });
    }
    this.modalReference.close();
  }
  addEditMRC() {
    if (this.MRCEdit == true) {
      this.MRCEdit = true;
      this.MRCEditedData['is_offers'] = this.isOffer.value;
      if(this.MRCEditedData['is_offers']==false){
        this.MRCEditedData['quantity'] = this.MRCQuantity.value;
      }
      this.MRCEditedData['name'] = this.MRCName.value;
      this.MRCEditedData['price'] = this.MRCPrice.value;
      this.MRCEditedData['bar_code'] = this.MRCBarCode.value;
      this.MRCEditedData['IID'] = StockComponent.selectedMRCID;
      console.log(this.MRCEditedData)
      this.stockService.editMRC(this.MRCEditedData).subscribe(Response => {
        this.globalMRCDataTable.ajax.reload(null, false);
        // alert(Response);
      }, error => {
        console.log(error);
      });
    }
    else {
      this.MRCEdit = false;
      // console.log(this.MRCForm.value)
      this.stockService.addNewMRC(this.MRCForm.value).subscribe(Response => {
        this.globalMRCDataTable.ajax.reload(null, false);
        // alert(Response)
      }, error => {
        alert(error)
      });
    }
    this.modalReference.close();
  }
  accDel() {
    var delID = {};
    delID['ID'] = StockComponent.selectedAccID;
    this.stockService.deleteItem(delID).subscribe(Response => {
      this.globalAccDataTable.ajax.reload(null, false);
      // alert(Response);
    }, error => {
      alert('error, check console');
      console.log(error);
    });
  }
  MRCDel() {
    var delID = {};
    delID['ID'] = StockComponent.selectedMRCID;
    this.stockService.deleteItem(delID).subscribe(Response => {
      this.globalMRCDataTable.ajax.reload(null, false);
      // alert(Response);
    }, error => {
      alert('error, check console');
      console.log(error);
    });
  }
  get accName() {
    return this.accForm.get('name');
  }
  get accPrice() {
    return this.accForm.get('price');
  }
  get accBarCode() {
    return this.accForm.get('bar_code');
  }
  get isOffer(){
    // if(this.is_Offers==true) this.is_Offers=false; else this.is_Offers=true;
    return this.MRCForm.get('isOffer');
  }
  get MRCName(){
    return this.MRCForm.get('name');
  }
  get MRCType(){
    return this.MRCForm.get('type');
  }
  get MRCQuantity(){
    return this.MRCForm.get('quantity');
  }
  get MRCPrice(){
    return this.MRCForm.get('price');
  }
  get MRCBarCode(){
    return this.MRCForm.get('bar_code');
  }
}
