import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplyInvoicesService } from './supply-invoices.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-supply-invoices',
  templateUrl: './supply-invoices.component.html',
  styleUrls: ['./supply-invoices.component.css']
})
export class SupplyInvoicesComponent implements OnInit {
  private sub;
  modalReference: any;
  private supplierForm;
  private paymentForm;
  paymentModalTitle;
  supplierModalTitle;
  editFlag = false;
  subscriberModalTitle;
  private static selectedRowData;
  private static selectedInvoiceID;
  private static selectedsupplierID;
  editedSupplierData = {};
  items: MenuItem[];
  invoiceDetails;
  private searchName;
  private globalsupplyInvoicesDT;


  constructor(private modalService: NgbModal, private supplyInvoicesService: SupplyInvoicesService,private spinner: NgxSpinnerService,private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.searchName = params['searchName'] || '-1';
    });

    var supplyInvoicesDT = $('#supplyInvoicesDT').DataTable({
      responsive: false,
      paging: true,
      pagingType: "full_numbers",
      serverSide: true,
      processing: true,
      ordering: true,
      stateSave: false,
      fixedHeader: true,
      select: {
        "style": "single"
      },
      searching: true,
      lengthMenu: [[5, 10, 25, 50, 100, 150, 200, 300], [5, 10, 25, 50, 100, 150, 200, 300]],
      ajax: {
        type: "get",
        url: "http://localhost/MoussaNet/src/assets/api/dataTables/supplyInvoiceDT.php",
        data: {},
        cache: true,
        async: true
      },
      
      language: {
        "thousands": ","
      },
      order: [[0, 'asc']],
      columns: [
        { data: "ID", title: "ID" },
        { data: "name", title: "Name" },
        { data: "type", title: "Type" },
        { data: "drawer", title: "Drawer" },
        { data: "invDate", title: "Invoice Date" },
        { data: "totalCost", title: "Total", render:$.fn.dataTable.render.number( ',', '.', 0, 'LL ' ) },
        { data: "rest", title: "Remaining" , render:$.fn.dataTable.render.number( ',', '.', 0, 'LL ' ) }

      ]
    });

    if (this.searchName != '-1') {
      supplyInvoicesDT.search(this.searchName).draw();
    }

    this.items = [
      {
        label: 'Show Details',
        icon: 'pi pi-fw pi-bars',
        command: (event) => {
          let element: HTMLElement = document.getElementById('showInvoiceDetails') as HTMLElement;
          element.click();
        }

      }, {
        label: 'New Payment',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          let element: HTMLElement = document.getElementById('newPaymentBtn') as HTMLElement;
          element.click();
        }

      }
    ];

    this.globalsupplyInvoicesDT = supplyInvoicesDT;

    supplyInvoicesDT.on('select', function (e, dt, type, indexes) {

      if (type === 'row') {
        SupplyInvoicesComponent.selectedRowData = supplyInvoicesDT.row(indexes).data();
        var data = supplyInvoicesDT.row(indexes).data()['ID'];
        SupplyInvoicesComponent.selectedInvoiceID = data;
      }
      else if (type === 'column') {
        SupplyInvoicesComponent.selectedInvoiceID = -1;
      }
    });

    $('#supplyInvoicesDT tbody').on('mousedown', 'tr', function (event) {
      if (event.which == 3) {
        supplyInvoicesDT.row(this).select();
      }
    });

    $('#supplyInvoicesDT').on('key-focus.dt', function (e, datatable, cell) {
      $(supplyInvoicesDT.row(cell.index().row).node()).addClass('selected');

    });
    $('#supplyInvoicesDT').on('key-blur.dt', function (e, datatable, cell) {
      $(supplyInvoicesDT.row(cell.index().row).node()).removeClass('selected');
    });
  }

  openInvoiceDetails(invoiceDetails) {
    this.spinner.show();
    this.supplyInvoicesService.getInvoiceDetails(SupplyInvoicesComponent.selectedInvoiceID).subscribe(Response => {
      this.spinner.hide();
      this.invoiceDetails=Response;
      var supplyInvoicesDT = $('#invoiceDetailsDT').DataTable({
        responsive: true,
        paging: true,
        pagingType: "full_numbers",
        serverSide: false,
        processing: true,
        ordering: true,
        stateSave: false,
        fixedHeader: false,
        searching: true,
        lengthMenu: [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]],
        data: this.invoiceDetails,
        order: [[0, 'asc']],
        columns: [
          
          { data: "name", title: "Name" },
          { data: "cost", title: "cost" , render:$.fn.dataTable.render.number( ',', '.', 0, 'LL ' ) },
          { data: "quantity", title: "quantity" }
  
        ]
      });
    }, error => {
      this.spinner.hide();
      alert(error)
    });
    this.modalReference = this.modalService.open(invoiceDetails, { centered: true, ariaLabelledBy: 'modal-basic-title', size: 'lg' });    
  }

  openNewPaymentModal(paymentModal){
    this.modalReference = this.modalService.open(paymentModal, { centered: true, ariaLabelledBy: 'modal-basic-title' });
    var amount = '';
    this.paymentModalTitle = "New Payment";

    
    this.paymentForm = this.fb.group({
      amount: [amount, [Validators.required,Validators.max(SupplyInvoicesComponent.selectedRowData['rest'])]],
      supplierID:[SupplyInvoicesComponent.selectedsupplierID]
    });

  }

}
