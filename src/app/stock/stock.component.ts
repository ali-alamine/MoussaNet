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
  accEditedData = {};
  MRCEditedData = {};

  constructor(private modalService: NgbModal,
  private fb: FormBuilder,
  private stockService: StockService) { }

  ngOnInit() {
   
    // this.viewStockAccDT();
    // private viewDT(acc);
    // console.log(this.tabGroup); // MdTabGroup Object
    // console.log(this.tabGroup.selectedIndex); // null
  }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if(tabChangeEvent.index==0){
      //stockAccDT
      // debugger
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
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
  }
  viewStockAccDT(){
    if(this.globalAccDataTable==null){
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
          data:{"type":"accessories"},
          cache: false,
          async: true
        },
        order: [[0, 'asc']],
        columns: [
          { data: "name", title: "NAME" },
          { data: "quantity", title: "QUANTITY" },
          { data: "price", title: "PRICE" }

        ],"columnDefs": [ {
          "targets": 1,
          "createdCell": function (td, cellData, rowData, row, col) {
            
            if ( rowData['isDamagedFlag']) {              
              $(td).html(cellData+" <i style='float:right; color: #FF0000;' md-18 class='material-icons'>new_releases</i> ")
            }
          }
        } ],
        createdRow: function (row, data, index) {
          if (data['isDamagedFlag'] == 1) {     
            $(row).attr('title', " CRT: " + data['crtD'] + " || Piece: " + data['pieceD'] + " || Price: " + data['priceD']);
          }
        }
      });
      this.globalAccDataTable=stockAccDT;
    }else{
      this.globalAccDataTable.ajax.reload(null, false);
    }
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
    // $('#stockAccDT tbody').on('mousedown', 'tr', function (event) {
    //   if (event.which == 3) {
    //     stockAccDT.row(this).select();
    //   }
    // });
    $('#stockAccDT').on('key-focus.dt', function (e, datatable, cell) {
      $(stockAccDT.row(cell.index().row).node()).addClass('selected');
    });
    $('#stockAccDT').on('key-blur.dt', function (e, datatable, cell) {
      $(stockAccDT.row(cell.index().row).node()).removeClass('selected');
    });
    this.accItems = [
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          let element: HTMLElement = document.getElementById('accEditBtn') as HTMLElement;
          element.click();
        }

      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          let element: HTMLElement = document.getElementById('accDelBtn') as HTMLElement;
          element.click();
        }
        
      }
    ];
  }
  viewStockMRCDT(){
    if(this.globalMRCDataTable==null){
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
          data:{"type":"rechargeCard"},
          cache: false,
          async: true
        },
        order: [[0, 'asc']],
        columns: [
          { data: "name", title: "CARD NAME" },
          { data: "card_company", title: "TYPE" },
          { data: "quantity", title: "QUANTITY" },
          { data: "price", title: "PRICE" }
  
        ],"columnDefs": [ {
          "targets": 1,
          "createdCell": function (td, cellData, rowData, row, col) {
            
            if ( rowData['isDamagedFlag']) {              
              $(td).html(cellData+" <i style='float:right; color: #FF0000;' md-18 class='material-icons'>new_releases</i> ")
            }
          }
        } ],
        createdRow: function (row, data, index) {
          if (data['isDamagedFlag'] == 1) {     
            $(row).attr('title', " CRT: " + data['crtD'] + " || Piece: " + data['pieceD'] + " || Price: " + data['priceD']);
          }
        }
      });
      this.globalMRCDataTable=stockMRCDT;
  } else{
    this.globalMRCDataTable.ajax.reload(null, false);
  }
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
      icon: 'pi pi-fw pi-pencil',
      command: (event) => {
        let element: HTMLElement = document.getElementById('MRCDelBtn') as HTMLElement;
        element.click();
      }
  
    }];
    stockMRCDT.on('select', function (e, dt, type, indexes) {
      if (type === 'row') {
        StockComponent.selectedRowDataMRC = stockMRCDT.row(indexes).data();
        var data = stockMRCDT.row(indexes).data()['ID'];
        StockComponent.selectedMRCID = data;
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
    $('#stockMRCDT tbody').on('click', 'a', function () {
      var data = stockMRCDT.row($(this).parents('tr')).data();
      // alert(data['ID']);
    });
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
          data:{"type":"isOffers"},
          cache: false,
          async: true
        },
        order: [[0, 'asc']],
        columns: [
          { data: "card_company", title: "$ CREDIT TYPE" },
          { data: "quantity", title: "AMOUNT" }

        ],"columnDefs": [ {
          "targets": 1,
          "createdCell": function (td, cellData, rowData, row, col) {
            
            if ( rowData['isDamagedFlag']) {              
              $(td).html(cellData+" <i style='float:right; color: #FF0000;' md-18 class='material-icons'>new_releases</i> ")
            }
          }
        } ],
        createdRow: function (row, data, index) {
          if (data['isDamagedFlag'] == 1) {     
            $(row).attr('title', " CRT: " + data['crtD'] + " || Piece: " + data['pieceD'] + " || Price: " + data['priceD']);
          }
        }
      });
      this.globalMCDataTable=stockMCDT;
    } else{
      this.globalMCDataTable.ajax.reload(null, false);
    }
    stockMCDT.on('select', function (e, dt, type, indexes) {
      if (type === 'row') {
        StockComponent.selectedRowDataMC = stockMCDT.row(indexes).data();
        var data = stockMCDT.row(indexes).data()['ID'];
        StockComponent.selectedMCID = data;
      }
      else if (type === 'column') {
      StockComponent.selectedMCID = -1;
      }
    });
    $('#stockMCDT tbody').on('mousedown', 'tr', function (event) {
      if (event.which == 3) {
        stockMCDT.row(this).select();
      }
    });
    $('#stockMCDT').on('key-focus.dt', function (e, datatable, cell) {
      $(stockMCDT.row(cell.index().row).node()).addClass('selected');
    });
    $('#stockMCDT').on('key-blur.dt', function (e, datatable, cell) {
      $(stockMCDT.row(cell.index().row).node()).removeClass('selected');
    });
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
      name: [name, Validators.required],
      price: [accPrice, Validators.required],
      bar_code: [accBarCode, Validators.required]
    });
  }
  openMRCModal(MRCModal, MRCEdit) {
    this.modalReference = this.modalService.open(MRCModal, { centered: true, ariaLabelledBy: 'modal-basic-title' });
    var isOffer = false;
    var MRCName = '';
    var MRCType = '';
    var MRCQuantity = '';
    var MRCPrice = '';
    var MRCBarCode = '';

    if (MRCEdit == true) {
      this.MRCEdit = true;
      MRCName = StockComponent.selectedRowDataMRC['name'];
      MRCQuantity = StockComponent.selectedRowDataMRC['quantity'];
      MRCPrice = StockComponent.selectedRowDataMRC['price'];
      MRCBarCode = StockComponent.selectedRowDataMRC['bar_code'];
      this.MRCModalTitle = "Update MOBILE RECHARGE CARD";
      this.MRCModalType = "Update";
      this.MRCForm = this.fb.group({
        name: [MRCName, Validators.required],
        quantity: [MRCQuantity, Validators.required],
        price: [MRCPrice, Validators.required],
        bar_code: [MRCBarCode, Validators.required]
      });
    } else{
      this.MRCEdit = false;
      this.MRCModalTitle = "ADD MOBILE RECHARGE CARD";
      this.MRCModalType = "Add";
      this.MRCForm = this.fb.group({
        isOffer: false,
        name: [MRCName, Validators.required],
        type: [MRCType, Validators.required],
        quantity: [MRCQuantity, Validators.required],
        price: [MRCPrice, Validators.required],
        bar_code: [MRCBarCode, Validators.required]
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
      this.MRCEditedData['name'] = this.MRCName.value;
      this.MRCEditedData['quantity'] = this.MRCQuantity.value;
      this.MRCEditedData['price'] = this.MRCPrice.value;
      this.MRCEditedData['bar_code'] = this.MRCBarCode.value;
      this.MRCEditedData['IID'] = StockComponent.selectedMRCID;
      this.stockService.editMRC(this.MRCEditedData).subscribe(Response => {
        this.globalMRCDataTable.ajax.reload(null, false);
        alert(Response);
      }, error => {
        console.log(error);
      });
    }
    else {
      this.MRCEdit = false;
      console.log(this.MRCForm.value)
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
    // if (StockComponent.selectedRowDataAcc['is_activated'] == 1) {
    //   alert('this user is activated, we should deactivate him')
    // }
    // else {
    //   alert('this user is deactivated, we should activate him')
    // }
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
  get isOffers(){
    return this.MRCForm.get('isOffers');
  }
  get MRCName(){
    return this.MRCForm.get('name');
  }get MRCType(){
    return this.MRCForm.get('type');
  }get MRCQuantity(){
    return this.MRCForm.get('quantity');
  }get MRCPrice(){
    return this.MRCForm.get('price');
  }get MRCBarCode(){
    return this.MRCForm.get('bar_code');
  }
}
