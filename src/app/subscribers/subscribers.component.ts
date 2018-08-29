import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
declare var $: any;
import { MenuItem } from 'primeng/api';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { SubscribersService } from './subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {
  private items: MenuItem[];
  private globalSubscriberDataTable;
  private static selectedRowData;
  private static selectedSubscriberID;
  private subscriberModalTitle;
  private subscriberForm;
  private resubscribeForm;
  modalReference: any;
  editedSubscriberData = {};
  editFlag = true;
  subscriberName;
  minExpDate;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private subscriberService: SubscribersService) { }

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
      lengthMenu: [[5, 10, 25, 50, 100, 150, 200, 300], [5, 10, 25, 50, 100, 150, 200, 300]],
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
        { data: "profile", title: "Profile" },
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
              return '<a class="payment" style="color:red;cursor: pointer;" >unset payment</a>';              
            }
            else if(data == 0 ) {
              return `<a class="payment" style="color:blue;cursor: pointer;">set payment</a>`;
            }
            else{
              return '';
            }
  
          }
        },
        {
        "targets": 8,
        "data": "is_activated",
        "render": function (data, type, row, meta) {
          if (data == 0) {
            return '<a class="deactivate" style="color:blue;cursor: pointer;" > Activate</a>';
            
          }
          else {
            return `<a class="deactivate" style="color:red;cursor: pointer;"> Deactivate</a>`;
          }

        }
      }
      
    ]
    });
    var date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    if (localStorage.getItem("date") === date) {
      // alert('no check');
    }
    else {
      
      this.subscriberService.autoSubscription().subscribe(Response => {
        this.globalSubscriberDataTable.ajax.reload(null, false);
        alert(Response);
      }, error => {
        console.log(error);
      });
      localStorage.setItem("date", date);
    }

    
    $('#subscribersDT tbody').on('click', 'a.deactivate', function () {
      var data = subscriberDataTable.row($(this).parents('tr')).data();
      alert(data['ID']+"   deac");
    });
    $('#subscribersDT tbody').on('click', 'a.payment', function () {
      var data = subscriberDataTable.row($(this).parents('tr')).data();
      alert(data['ID']+"   payment");
    });


    this.items = [
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          let element: HTMLElement = document.getElementById('editSubscriberBtn') as HTMLElement;
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
  openResubscribeModal(resubscribeModal){
    this.modalReference = this.modalService.open(resubscribeModal, { centered: true, ariaLabelledBy: 'modal-basic-title' });
    var subDate = '';
    var expDate = '';
    this.subscriberName=SubscribersComponent.selectedRowData['name'];

    this.minExpDate =new Date(SubscribersComponent.selectedRowData['expDate']);
    this.resubscribeForm = this.fb.group({
      subDate: [subDate, Validators.required],
      expDate: { disabled: true}
    });

    this.onChanges();
  }
  onChanges(): void {
    this.resubscribeForm.get('subDate').valueChanges.subscribe(val => {
      var expDate = new Date(this.resubscribeForm.get('subDate').value);

      expDate= new Date(expDate.setMonth(expDate.getMonth() + 1));
      this.resubscribeForm.get('expDate').setValue(expDate)
    });
    
  }

  openSubscriberModal(subscriberModal, edit) {
    this.modalReference = this.modalService.open(subscriberModal, { centered: true, ariaLabelledBy: 'modal-basic-title' });
    var name = '';
    var phone = '';
    var address = '';
    this.subscriberModalTitle = "Add Subscriber";

    if (edit == true) {
      name = SubscribersComponent.selectedRowData['name'];
      phone = SubscribersComponent.selectedRowData['phone'];
      address = SubscribersComponent.selectedRowData['address'];
      this.subscriberModalTitle = "Update Subscriber";
    }
    this.subscriberForm = this.fb.group({
      name: [name, Validators.required],
      phone: [phone, Validators.required],
      address: [address, Validators.required]
    });
  }

  addEditSubscriber() {

    if (this.editFlag == true) {
      this.editFlag = true;
      this.editedSubscriberData['name'] = this.name.value;
      this.editedSubscriberData['address'] = this.address.value;
      this.editedSubscriberData['phone'] = this.phoneNumber.value;
      this.editedSubscriberData['id'] = SubscribersComponent.selectedSubscriberID;


      this.subscriberService.editSubscriber(this.editedSubscriberData).subscribe(Response => {
        this.globalSubscriberDataTable.ajax.reload(null, false);
        alert(Response);
      }, error => {
        console.log(error);
      });
    }
    else {
      this.editFlag = false;
      console.log(this.subscriberForm.value)
      this.subscriberService.addNewSubscriber(this.subscriberForm.value).subscribe(Response => {
        this.globalSubscriberDataTable.ajax.reload(null, false);
        alert(Response)
      }, error => {
        alert(error)
      });
    }

    this.modalReference.close();
  }

  enableDisableSub() {
    if (SubscribersComponent.selectedRowData['is_activated'] == 1) {
      alert('this user is activated, we should deactivate him')
    }
    else {
      alert('this user is deactivated, we should activate him')
    }
  }
 private formatDate(value)
{
   return value.getMonth()+1 + "/" + value.getDate() + "/" + value.getYear();
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

}
