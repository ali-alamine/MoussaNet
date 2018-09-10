import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
declare var $: any;
@Component({
  selector: 'app-supply-invoices',
  templateUrl: './supply-invoices.component.html',
  styleUrls: ['./supply-invoices.component.css']
})
export class SupplyInvoicesComponent implements OnInit {

  modalReference: any;
  private supplierForm;
  private paymentForm;
  paymentModalTitle;
  supplierModalTitle;
  editFlag=false;
  subscriberModalTitle;
  private static selectedRowData;
  private static selectedsupplierID;
  editedSupplierData = {};
  items: MenuItem[];
  private globalsupplyInvoicesDT;

  
  constructor() { }

  ngOnInit() {
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
      order: [[0, 'asc']],
      columns: [
        { data: "ID", title: "ID" },
        { data: "name", title: "Name" },
        { data: "type", title: "Type" },
        { data: "invDate", title: "Invoice Date" },
        { data: "totalCost", title: "Total" },
        { data: "rest", title: "Remaining" }       

      ]
    });

    this.items = [
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          let element: HTMLElement = document.getElementById('editSupplierBtn') as HTMLElement;
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
        SupplyInvoicesComponent.selectedsupplierID = data;
      }
      else if (type === 'column') {
        SupplyInvoicesComponent.selectedsupplierID = -1;
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

}
