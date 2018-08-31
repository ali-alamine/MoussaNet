import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-subscribers-report',
  templateUrl: './subscribers-report.component.html',
  styleUrls: ['./subscribers-report.component.css']
})
export class SubscribersReportComponent implements OnInit {
  panelOpenState = false;
  filterForm;
  constructor(private fb: FormBuilder) { }

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
        data: { "paid": 1},
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
    this.filterForm = this.fb.group({
      paid: [''],
      address: [''],
      profile: [''],
      fromSubDate:[],
      toSubDate:[],
      fromExpDate:[],
      toExpDate:[],
    });
  }

  clearForm(){
    this.filterForm.resetForm();
  }

  searchSubmit(){
    console.log(this.filterForm.value);
  }

}