import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-supply-invoices',
  templateUrl: './supply-invoices.component.html',
  styleUrls: ['./supply-invoices.component.css']
})
export class SupplyInvoicesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var suppliersDataTable = $('#supplyInvoicesDT').DataTable({
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
        url: "http://localhost/MoussaNet/src/assets/api/dataTables/supplyDT.php",
        data: {},
        cache: true,
        async: true
      },
      order: [[0, 'asc']],
      columns: [
        { data: "ID", title: "ID" },
        { data: "name", title: "Name" },
        { data: "invDate", title: "Invoice Date" },
        { data: "rest", title: "Remaining" },
        { data: "totalPrice", title: "Total Price" }

      ]
    });
  }

}
