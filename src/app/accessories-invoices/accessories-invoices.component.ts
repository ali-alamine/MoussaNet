import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AccessoriesInvoicesService } from './accessories-invoices.service';
declare var $: any;
import Swal from 'sweetalert2';
@Component({
  selector: 'app-accessories-invoices',
  templateUrl: './accessories-invoices.component.html',
  styleUrls: ['./accessories-invoices.component.css']
})
export class AccessoriesInvoicesComponent implements OnInit {
  items: MenuItem[];
  private globalCentralInvDT;
  private static selectedRowData;
  private static selectedCentralInvoiceID;
  constructor(private accessoriesInvoicesService: AccessoriesInvoicesService) { }

  ngOnInit() {

    var internetInvoicesDT = $('#accessoriesInvoicesDT').DataTable({
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
      lengthMenu: [[25, 50, 100, 200, 400, 800], [25, 50, 100, 200, 400, 800]],
      ajax: {
        type: "get",
        url: "http://localhost/MoussaNet/src/assets/api/dataTables/accInvoicesDT.php",
        data: {},
        cache: true,
        async: true
      },
      order: [[0, 'desc']],
      columns: [

        { data: "date", title: "Sell Date" },
        { data: "name", title: "Item Name" },
        { data: "clientName", title: "Client Name" },
        { data: "quantity", title: "Quantity" },
        { data: "price", title: "Price", render: $.fn.dataTable.render.number(',', '.', 0, 'LL ') },
        { data: "profit", title: "Profit", render: $.fn.dataTable.render.number(',', '.', 0, 'LL ') }
      ]
    });


    this.items = [
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-times',
        command: (event) => {
          let element: HTMLElement = document.getElementById('deleteInvoiceBtn') as HTMLElement;
          element.click();
        }

      }
    ];

    this.globalCentralInvDT = internetInvoicesDT;

    internetInvoicesDT.on('select', function (e, dt, type, indexes) {

      if (type === 'row') {
        AccessoriesInvoicesComponent.selectedRowData = internetInvoicesDT.row(indexes).data();
        var data = internetInvoicesDT.row(indexes).data()['invoiceID'];
        AccessoriesInvoicesComponent.selectedCentralInvoiceID = data;
      }
      else if (type === 'column') {
        AccessoriesInvoicesComponent.selectedCentralInvoiceID = -1;
      }
    });

    $('#accessoriesInvoicesDT tbody').on('mousedown', 'tr', function (event) {
      if (event.which == 3) {
        internetInvoicesDT.row(this).select();
      }
    });

    $('#accessoriesInvoicesDT').on('key-focus.dt', function (e, datatable, cell) {
      $(internetInvoicesDT.row(cell.index().row).node()).addClass('selected');

    });
    $('#accessoriesInvoicesDT').on('key-blur.dt', function (e, datatable, cell) {
      $(internetInvoicesDT.row(cell.index().row).node()).removeClass('selected');
    });

  }

  deleteInvoice() {
    let now = new Date();
    let invoiceDate = new Date(AccessoriesInvoicesComponent.selectedRowData['date']);
    now.setHours(0,0,0,0);
    invoiceDate.setHours(0,0,0,0);

    if (now.getTime() === invoiceDate.getTime()) {
      Swal({
        title: "Delete Invoice",
        html: "Do you want to delete this invoice",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No',     
      }).then((result) => {
        if (result.value) {
          this.accessoriesInvoicesService.deleteInvoice(AccessoriesInvoicesComponent.selectedRowData).subscribe(Response => {
            this.globalCentralInvDT.ajax.reload(null, false);
            Swal({
              type: 'success',
              title: 'Success',
              text:'Invoice Deleted Successfully',
              showConfirmButton: false,
              timer: 1000
            });     
          }, error => {
            Swal({
              type: 'error',
              title: error.statusText,
              text:error.message
            });
          });
        }
      });
    } else {
      Swal({
        type: 'info',
        title: "You can not delete this row",
        text: "this invoice's date is not today"
      });
      return;
    }

  }
}