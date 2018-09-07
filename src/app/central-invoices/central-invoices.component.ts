import { Component, OnInit } from '@angular/core';
declare var $: any;
import { MenuItem } from 'primeng/api';
import { CentralInvoicesService } from './central-invoices.service';
@Component({
  selector: 'app-central-invoices',
  templateUrl: './central-invoices.component.html',
  styleUrls: ['./central-invoices.component.css']
})
export class CentralInvoicesComponent implements OnInit {
  items: MenuItem[];
  private globalCentralInvDT;
  private static selectedRowData;
  private static selectedCentralInvoiceID;
  constructor(private centralInvoiceService:CentralInvoicesService) { }

  ngOnInit() {
    var internetInvoicesDT = $('#centralInvoicesDT').DataTable({
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
      lengthMenu: [[ 25, 50, 100, 200, 400,800], [ 25, 50, 100, 200, 400,800]],
      ajax: {
        type: "get",
        url: "http://localhost/MoussaNet/src/assets/api/dataTables/centralInvoicesDT.php",
        data: {},
        cache: true,
        async: true
      },
      order: [[0, 'desc']],
      columns: [
        
        { data: "date", title: "Date" },
        { data: "duration", title: "Duration" },
        { data: "country", title: "Country" },
        { data: "price", title: "Price" }
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

      },
      {
        label: 'Delete wo change',
        icon: 'pi pi-fw pi-times',
        command: (event) => {
          let element: HTMLElement = document.getElementById('deleteInvoiceWoChangeBtn') as HTMLElement;
          element.click();
        }

      }
    ];

    this.globalCentralInvDT = internetInvoicesDT;

    internetInvoicesDT.on('select', function (e, dt, type, indexes) {

      if (type === 'row') {
        CentralInvoicesComponent.selectedRowData = internetInvoicesDT.row(indexes).data();
        var data = internetInvoicesDT.row(indexes).data()['ID'];
        CentralInvoicesComponent.selectedCentralInvoiceID = data;
      }
      else if (type === 'column') {
        CentralInvoicesComponent.selectedCentralInvoiceID = -1;
      }
    });

    $('#centralInvoicesDT tbody').on('mousedown', 'tr', function (event) {
      if (event.which == 3) {
        internetInvoicesDT.row(this).select();
      }
    });

    $('#centralInvoicesDT').on('key-focus.dt', function (e, datatable, cell) {
      $(internetInvoicesDT.row(cell.index().row).node()).addClass('selected');

    });
    $('#centralInvoicesDT').on('key-blur.dt', function (e, datatable, cell) {
      $(internetInvoicesDT.row(cell.index().row).node()).removeClass('selected');
    });
  }

  deleteInvoice(){
    this.centralInvoiceService.deleteInvoice(CentralInvoicesComponent.selectedRowData).subscribe(Response => {
      this.globalCentralInvDT.ajax.reload(null, false);
    }, error => {
      console.log(error);
    });
  }

  deleteInvoiceWOchange(){
    this.centralInvoiceService.deleteInvoiceWoChange(CentralInvoicesComponent.selectedRowData).subscribe(Response => {
      this.globalCentralInvDT.ajax.reload(null, false);
    }, error => {
      console.log(error);
    });
  }

}
