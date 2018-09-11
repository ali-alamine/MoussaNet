import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
declare var $: any;
import { MenuItem } from 'primeng/api';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { SubscribersService } from './subscribers.service';
import { Router } from '@angular/router';
import { SubscriptionComponent } from '../subscription/subscription.component';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {
  items: MenuItem[];
  private globalSubscriberDataTable;
  private static selectedRowData;
  private static selectedSubscriberID;
  private subscriberModalTitle;
  private subscriberForm;
  private resubscribeForm;
  modalReference: any;
  editedSubscriberData = {};
  editFlag = false;
  subscriberName;
  minExpDate;
  private subscriberMonths;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private subscriberService: SubscribersService,private router: Router,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    var subscriberDataTable = $('#subscribersDT').DataTable({
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
        url: "http://localhost/MoussaNet/src/assets/api/dataTables/subscriberDataTable.php",
        data: { "userID": 12, "isAdmin": 2 },
        cache: true,
        async: true
      },
      order: [[0, 'asc']],
      columns: [
        { data: "ID", title: "ID" },
        { data: "name", title: "Name" },
        { data: "profile", title: "Profile",render:$.fn.dataTable.render.number( ',', '.', 0, 'LL ' ) },
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
    // var date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.spinner.show();
    // if (localStorage.getItem("date") === date) {
      // this.spinner.hide();
    // }
    // else {
      
      
      this.subscriberService.autoSubscription().subscribe(Response => {
        this.globalSubscriberDataTable.ajax.reload(null, false);
        this.spinner.hide();
      }, error => {
        console.log(error);
        this.spinner.hide();
      });
      // localStorage.setItem("date", date);
    // }


    $('#subscribersDT tbody').on('click', 'a.deactivate', function () {
      var data = subscriberDataTable.row($(this).parents('tr')).data();
      var data12 = { "id": data['ID'] };


    });
    $('#subscribersDT tbody').on('click', 'a.payment', function () {
      var data = subscriberDataTable.row($(this).parents('tr')).data();
      alert(data['ID'] + "   payment");
    });


    this.items = [
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          let element: HTMLElement = document.getElementById('editSubscriberBtn') as HTMLElement;
          element.click();
        }

      }, {
        label: 'Toggle Activation',
        icon: 'pi pi-fw pi-ban',
        command: (event) => {
          let element: HTMLElement = document.getElementById('toggleActivationBtn') as HTMLElement;
          element.click();
        }

      }, {
        label: 'Toggle Payment',
        icon: 'pi pi-fw pi-ban',
        command: (event) => {
          let element: HTMLElement = document.getElementById('togglePaymentBtn') as HTMLElement;
          element.click();
        }

      },
      {
        label: 'Resubscribe',
        icon: 'pi pi-fw pi-cloud',
        command: (event) => {
          let element: HTMLElement = document.getElementById('resubscribeBtn') as HTMLElement;
          element.click();
        }

      },
      {
        label: 'Show payments',
        icon: 'pi pi-fw pi-arrow-right',
        command: (event) => {
          let element: HTMLElement = document.getElementById('showPayments') as HTMLElement;
          element.click();
        }

      },
      {
        label: 'Show payments2',
        icon: 'pi pi-fw pi-arrow-right',
        command: (event) => {
          let element: HTMLElement = document.getElementById('showPayments2') as HTMLElement;
          element.click();
        }

      }
    ];
    this.globalSubscriberDataTable = subscriberDataTable;

    subscriberDataTable.on('select', function (e, dt, type, indexes) {

      if (type === 'row') {
        SubscribersComponent.selectedRowData = subscriberDataTable.row(indexes).data();
        var data = subscriberDataTable.row(indexes).data()['ID'];
        SubscribersComponent.selectedSubscriberID = data;
      }
      else if (type === 'column') {
        SubscribersComponent.selectedSubscriberID = -1;
      }
    });

    $('#subscribersDT tbody').on('mousedown', 'tr', function (event) {
      if (event.which == 3) {
        subscriberDataTable.row(this).select();
      }
    });

    $('#subscribersDT').on('key-focus.dt', function (e, datatable, cell) {
      $(subscriberDataTable.row(cell.index().row).node()).addClass('selected');

    });
    $('#subscribersDT').on('key-blur.dt', function (e, datatable, cell) {
      $(subscriberDataTable.row(cell.index().row).node()).removeClass('selected');
    });
  }
  openResubscribeModal(resubscribeModal) {
    if(SubscribersComponent.selectedRowData['is_activated']==0)
    {
      Swal({
        type: 'info',
        title: "This user is deactivated",
        text:'Activate this user to autosubscribe his service'
      });
     
    }
    this.modalReference = this.modalService.open(resubscribeModal, { centered: true, ariaLabelledBy: 'modal-basic-title' });
    var subDate = '';
    var expDate = '';
    var isPaid=0;
    var subID=SubscribersComponent.selectedSubscriberID;
    var profile=SubscribersComponent.selectedRowData['profile'];

    this.subscriberName = SubscribersComponent.selectedRowData['name'];

    this.minExpDate = new Date(SubscribersComponent.selectedRowData['expDate']);
    this.resubscribeForm = this.fb.group({
      subDate: [subDate, Validators.required],
      expDate: { disabled: true },
      isPaid:[isPaid],
      profile:[profile],
      subID:[subID]
    });

    this.onChanges();
  }
  onChanges(): void {
    this.resubscribeForm.get('subDate').valueChanges.subscribe(val => {
      var expDate = new Date(this.resubscribeForm.get('subDate').value);

      expDate = new Date(expDate.setMonth(expDate.getMonth() + 1));
      this.resubscribeForm.get('expDate').setValue(expDate)
    });

  }

  openSubscriberModal(subscriberModal) {
    this.modalReference = this.modalService.open(subscriberModal, { centered: true, ariaLabelledBy: 'modal-basic-title' });
    var name = '';
    var phone = '';
    var address = '';
    var profile = '';
    this.subscriberModalTitle = "Add Subscriber";

    if (this.editFlag == true) {
      name = SubscribersComponent.selectedRowData['name'];
      phone = SubscribersComponent.selectedRowData['phone'];
      address = SubscribersComponent.selectedRowData['address'];
      profile = SubscribersComponent.selectedRowData['profile'];
      this.subscriberModalTitle = "Update Subscriber";
    }
    this.subscriberForm = this.fb.group({
      name: [name, Validators.required],
      phone: [phone, Validators.required],
      address: [address, Validators.required],
      profile: [profile, Validators.required]
    });
  }

  addEditSubscriber() {
    if (this.editFlag == true) {
      this.editedSubscriberData['name'] = this.name.value;
      this.editedSubscriberData['address'] = this.address.value;
      this.editedSubscriberData['phone'] = this.phoneNumber.value;
      this.editedSubscriberData['profile'] = this.profile.value;
      this.editedSubscriberData['id'] = SubscribersComponent.selectedSubscriberID;
      this.subscriberService.editSubscriber(this.editedSubscriberData).subscribe(Response => {
        this.globalSubscriberDataTable.ajax.reload(null, false);        
        Swal({
          type: 'success',
          title: 'Success',
          text:'Subscriber Updated Successfully',
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
    else {
      this.subscriberService.addNewSubscriber(this.subscriberForm.value).subscribe(Response => {
        this.globalSubscriberDataTable.ajax.reload(null, false);
        Swal({
          type: 'success',
          title: 'Success',
          text:'Subscriber Added Successfully',
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
    this.modalReference.close();
  }
  toggleActivation() {
    var title = "Activate User";
    var text = "Do you want to <b> activate </b> this user ?"
    if(SubscribersComponent.selectedRowData['is_activated']==1){
      text = "Do you want to <b> deactivate </b> this user ?";
      title = "Deactivate User";
    }
    
    Swal({
      title: title,
      html: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No',     
    }).then((result) => {
      if (result.value) {
        this.subscriberService.toggleSubscriberActivation(SubscribersComponent.selectedSubscriberID).subscribe(Response => {
          this.globalSubscriberDataTable.ajax.reload(null, false);
          Swal({
            type: 'success',
            title: 'Success',
            text:'User State Changed Successfully',
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
    })  
  }

  togglePayment() {
    if(SubscribersComponent.selectedRowData['subDetID']==''){
      Swal({
        type: 'info',
        title: "This user isn't subscribed",
        text:'Please resubscribe before changing payment state'
      });
      return;
    }
    var text = "Do you want to set this payment as <b> unpaid </b> ?"
    if(SubscribersComponent.selectedRowData['isPaid']==0){
      text = "Do you want to set this payment as <b>paid</b> ?"
    }
    Swal({
      title: 'Are you shoes?',
      html: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No',     
    }).then((result) => {
      if (result.value) {
        this.subscriberService.togglePayment(SubscribersComponent.selectedRowData['subDetID']).subscribe(Response => {
          this.globalSubscriberDataTable.ajax.reload(null, false);
          Swal({
            type: 'success',
            title: 'Success',
            text:'Payment State Changed Successfully',
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
    
  }
  navigateToSubsc() {
    this.router.navigate(['/subscription'], { queryParams: { searchName: SubscribersComponent.selectedRowData['name'] } });
  }

  resubscribeSubmit(){
    this.subscriberService.newSubscription(this.resubscribeForm.value).subscribe(Response => {
      this.globalSubscriberDataTable.ajax.reload(null, false);
      Swal({
        type: 'success',
        title: 'Success',
        text:'Subscribtion Added Successfully',
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
    this.modalReference.close();
  }

  showMonths(invoicePayments) {
    this.spinner.show();
    this.subscriberService.getMonths(SubscribersComponent.selectedSubscriberID).subscribe(Response => {
      this.spinner.hide();
      this.subscriberMonths=Response;
      var invoicePaymentsDT = $('#subsMonths').DataTable({
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
        data: this.subscriberMonths,
        order: [[0, 'desc']],
        columns: [
          
          { data: "name", title: "Name" },
          { data: "profile", title: "Amount", render:$.fn.dataTable.render.number( ',', '.', 0, 'LL ' )},
          { data: "sub_date", title: "Sub Date" },
          { data: "exp_date", title: "Exp Date" },
          { data: "is_activated", title: "Act" },
          { data: "is_paid", title: "Paid" }
  
        ]
      });
    }, error => {
      this.spinner.hide();
      alert(error)
    });
    this.modalReference = this.modalService.open(invoicePayments, { centered: true, ariaLabelledBy: 'modal-basic-title', size: 'lg' });    
  }

  get name() {
    return this.subscriberForm.get('name');
  }
  get phoneNumber() {
    return this.subscriberForm.get('phone');
  }
  get address() {
    return this.subscriberForm.get('address');

  }
  get profile() {
    return this.subscriberForm.get('profile');

  }

}
