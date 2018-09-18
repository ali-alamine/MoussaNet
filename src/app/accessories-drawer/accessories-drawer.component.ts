import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { AccessoriesDrawerService } from './accessories-drawer.service';
declare var $: any;

@Component({
  selector: 'app-accessories-drawer',
  templateUrl: './accessories-drawer.component.html',
  styleUrls: ['./accessories-drawer.component.css']
})
export class AccessoriesDrawerComponent implements OnInit {
  private accDrawer;
  modalReference: any;
  private clientForm;
  paymentModalTitle;
  clientModalTitle;
  editFlag=false;
  subscriberModalTitle;
  private static selectedRowData;
  private static selectedClientID;
  editedClientData = {};
  items: MenuItem[];
  private globalaccDrawerDT;

  constructor(private accDrawerService: AccessoriesDrawerService,
    private modalService: NgbModal, 
    private fb: FormBuilder) { }

  ngOnInit() {
    this.accDrawerService.getAccDrawer().subscribe(Response => {
      this.accDrawer = Response;
      $('#accDrawerDT').dataTable().fnAddData( this.accDrawer);
    },error => {
      console.log(error)
    });

    var accDrawerDT = $('#accDrawerDT').DataTable({
      responsive: true,
      paging: true,
      pagingType: "full_numbers",
      serverSide: false,
      processing: true,
      select: {
        "style": "single"
      },
      ordering: true,
      stateSave: false,
      fixedHeader: false,
      searching: true,
      lengthMenu: [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]],
      data: this.accDrawer,
      order: [[0, 'desc']],
      columns: [

        { data: "date", title: "Drawer Date" },
        { data: "total", title: "Drawer Total" },
        { data: "amount", title: "Intial Amount", render: $.fn.dataTable.render.number(',', '.', 0, 'LL ') },
        { data: "sumPrice", title: "Payments In", render: $.fn.dataTable.render.number(',', '.', 0, 'LL ') },
        { data: "sumProfit", title: "Profit In", render: $.fn.dataTable.render.number(',', '.', 0, 'LL ') },
        { data: "supplySum", title: "Supply Payments", render: $.fn.dataTable.render.number(',', '.', 0, 'LL ') },
        { data: "sumWithdraw", title: "Withdraw", render: $.fn.dataTable.render.number(',', '.', 0, 'LL ') },
        { data: "sumAdded", title: "Add", render: $.fn.dataTable.render.number(',', '.', 0, 'LL ') }

      ]
    });

    this.items = [
      {
        label: 'Show Details',
        icon: 'pi pi-fw pi-bars',
        command: (event) => {
          let element: HTMLElement = document.getElementById('editClientBtn') as HTMLElement;
          element.click();
        }

      }
    ];

    this.globalaccDrawerDT = accDrawerDT;

    accDrawerDT.on('select', function (e, dt, type, indexes) {

      if (type === 'row') {
        AccessoriesDrawerComponent.selectedRowData = accDrawerDT.row(indexes).data();
        var data = accDrawerDT.row(indexes).data()['ID'];
        AccessoriesDrawerComponent.selectedClientID = data;
      }
      else if (type === 'column') {
        AccessoriesDrawerComponent.selectedClientID = -1;
      }
    });

    $('#accDrawerDT tbody').on('mousedown', 'tr', function (event) {
      if (event.which == 3) {
        accDrawerDT.row(this).select();
      }
    });

    $('#accDrawerDT').on('key-focus.dt', function (e, datatable, cell) {
      $(accDrawerDT.row(cell.index().row).node()).addClass('selected');

    });
    $('#accDrawerDT').on('key-blur.dt', function (e, datatable, cell) {
      $(accDrawerDT.row(cell.index().row).node()).removeClass('selected');
    });

    
  }
}
