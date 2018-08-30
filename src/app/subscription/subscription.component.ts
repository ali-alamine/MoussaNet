import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {SubscriptionService } from './subscription.service';
declare var $: any;

@Component({
  selector: 'app-subscribers-report',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  private items: MenuItem[];
  private globalSubscriberReportDT;
  private static selectedRowData;
  private static selectedSubscriberID;
  constructor(private subscriberReportService:SubscriptionService) { }

  ngOnInit() {
    var subscriberDataTable = $('#subscribersRprtDT').DataTable({
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
        url: "http://localhost/MoussaNet/src/assets/api/dataTables/subRprtDataTable.php",
        data: { "userID": 12, "isAdmin": 2 },
        cache: true,
        async: true
      },
      order: [[0, 'asc']],
      columns: [
        { data: "ID", title: "ID" },
        { data: "name", title: "Name" },
        { data: "profile", title: "Amount" },
        { data: "phone", title: "Phone" },
        { data: "address", title: "Address" },
        { data: "subDate", title: "Sub Date" },
        { data: "expDate", title: "Exp Date" },
        { data: "isPaid", title: "Paid/Unpaid" },
        { data: "is_activated", title: "Activated" }

      ],
      "columnDefs": [
        {
          "targets": 7,
          "data": "isPaid",
          "render": function (data, type, row, meta) {
            if (data == 1) {
              return '<p  style="color:blue">Paid</a>';
            }
            else if (data == 0) {
              return '<p  style="color:red">Unpaid</a>';
            }
            else {
              return '';
            }

          }
        },
        {
          "targets": 8,
          "data": "is_activated",
          "render": function (data, type, row, meta) {
            if (data == 0) {
              return '<p  style="color:red">Deactivated</a>';

            }
            else {
              return '<p  style="color:blue">Activated</a>';
            }

          }
        }

      ]
    });

    this.items = [
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          let element: HTMLElement = document.getElementById('deleteSubscriberBtn') as HTMLElement;
          element.click();
        }

      },
       {
        label: 'Toggle Payment',
        icon: 'pi pi-fw pi-ban',
        command: (event) => {
          let element: HTMLElement = document.getElementById('togglePaymentBtn') as HTMLElement;
          element.click();
        }

      }
    ];

    this.globalSubscriberReportDT = subscriberDataTable;

    subscriberDataTable.on('select', function (e, dt, type, indexes) {

      if (type === 'row') {
        SubscriptionComponent.selectedRowData = subscriberDataTable.row(indexes).data();
        var data = subscriberDataTable.row(indexes).data()['ID'];
        SubscriptionComponent.selectedSubscriberID = data;
      }
      else if (type === 'column') {
        SubscriptionComponent.selectedSubscriberID = -1;
      }
    });

    $('#subscribersRprtDT tbody').on('mousedown', 'tr', function (event) {
      if (event.which == 3) {
        subscriberDataTable.row(this).select();
      }
    });

    $('#subscribersRprtDT').on('key-focus.dt', function (e, datatable, cell) {
      $(subscriberDataTable.row(cell.index().row).node()).addClass('selected');

    });
    $('#subscribersRprtDT').on('key-blur.dt', function (e, datatable, cell) {
      $(subscriberDataTable.row(cell.index().row).node()).removeClass('selected');
    });
  }

  togglePayment() {
    console.log(SubscriptionComponent.selectedRowData);
    this.subscriberReportService.togglePayment(SubscriptionComponent.selectedRowData['subDetID']).subscribe(Response => {
      this.globalSubscriberReportDT.ajax.reload(null, false);      
    }, error => {
      console.log(error);
    });
  }

  deleteSubscription() {
    this.subscriberReportService.deleteSubscription(SubscriptionComponent.selectedRowData['subDetID']).subscribe(Response => {
      this.globalSubscriberReportDT.ajax.reload(null, false);      
    }, error => {
      console.log(error);
    });
  }

}
