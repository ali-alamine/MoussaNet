import { Component, OnInit } from '@angular/core';
import { InternetDrawerService } from './internet-drawer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
declare var $: any;
@Component({
  selector: 'app-internet-drawer',
  templateUrl: './internet-drawer.component.html',
  styleUrls: ['./internet-drawer.component.css']
})
export class InternetDrawerComponent implements OnInit {
  private internetDrawer;

  modalReference: any;
  private clientForm;
  private paymentForm;
  paymentModalTitle;
  clientModalTitle;
  editFlag=false;
  subscriberModalTitle;
  private static selectedRowData;
  private static selectedClientID;
  editedClientData = {};
  items: MenuItem[];
  private globalInternetDrawerDT;

  constructor(private internetDrawerService: InternetDrawerService,private modalService: NgbModal, private fb: FormBuilder,) { }
  ngOnInit() {

    

    this.internetDrawerService.getInternetDrawer().subscribe(Response => {
      this.internetDrawer = Response;
      $('#internetDrawerDT').dataTable().fnAddData( this.internetDrawer);
    },error => {
      console.log(error)
    });

    var internetDrawerDT = $('#internetDrawerDT').DataTable({
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
      data: this.internetDrawer,
      order: [[0, 'desc']],
      columns: [

        { data: "paymentDate", title: "Date" },
        { data: "sum(profile)", title: "Amount", render: $.fn.dataTable.render.number(',', '.', 0, 'LL ') },
        { data: "sum(profile)", title: "Added", render: $.fn.dataTable.render.number(',', '.', 0, 'LL ') },
        { data: "sum(profile)", title: "withdrawn", render: $.fn.dataTable.render.number(',', '.', 0, 'LL ') }
        

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

    this.globalInternetDrawerDT = internetDrawerDT;

    internetDrawerDT.on('select', function (e, dt, type, indexes) {

      if (type === 'row') {
        InternetDrawerComponent.selectedRowData = internetDrawerDT.row(indexes).data();
        var data = internetDrawerDT.row(indexes).data()['ID'];
        InternetDrawerComponent.selectedClientID = data;
      }
      else if (type === 'column') {
        InternetDrawerComponent.selectedClientID = -1;
      }
    });

    $('#internetDrawerDT tbody').on('mousedown', 'tr', function (event) {
      if (event.which == 3) {
        internetDrawerDT.row(this).select();
      }
    });

    $('#internetDrawerDT').on('key-focus.dt', function (e, datatable, cell) {
      $(internetDrawerDT.row(cell.index().row).node()).addClass('selected');

    });
    $('#internetDrawerDT').on('key-blur.dt', function (e, datatable, cell) {
      $(internetDrawerDT.row(cell.index().row).node()).removeClass('selected');
    });

    
  }

  openNewPaymentModal(paymentModal){
    this.modalReference = this.modalService.open(paymentModal, { centered: true, ariaLabelledBy: 'modal-basic-title' });
    var amount = '';
    this.paymentModalTitle = "New Payment";

    
    this.paymentForm = this.fb.group({
      amount: [amount, [Validators.required,Validators.max(InternetDrawerComponent.selectedRowData['debit'])]],
      clientID:[InternetDrawerComponent.selectedClientID]
    });

  }

  addNewPayment(){
    this.internetDrawerService.newPayment(this.paymentForm.value).subscribe(Response => {
      this.globalInternetDrawerDT.ajax.reload(null, false);
      alert(Response)
    }, error => {
      alert(error)
    });
    this.modalReference.close();
  }

}



// SELECT sum(`profile`) from subscriber_detail where `is_paid` = 1 and DATE(payment_date) = CURDATE();
// select sum('amount') from operation where date = CURDATE(); 