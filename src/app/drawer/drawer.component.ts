import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { NgbModal } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { DrawerService } from './drawer.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {
  currentUrl: string;
  modalReference: any;
  private paymentForm;
  private operationForm;
  operationModalTitle;
  clientModalTitle;
  subscriberModalTitle;
  editedClientData = {};
  private globalMobileDrawerDT;
  public selectedVal: string;

  constructor(private drawerService: DrawerService,
    private router: Router,
    private modalService: NgbModal, 
    private fb: FormBuilder) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
   }

  ngOnInit() {
    this.selectedVal="mobileDrawer";
    this.router.navigate(["drawer/mobileDrawer"]);
  }
  public onValChange(val: string) {
    this.selectedVal = val;
  }
  openOperationModal(openModal,type){
    var drawer="";
    this.modalReference = this.modalService.open(openModal, { centered: true, ariaLabelledBy: 'modal-basic-title' });
    if(type=='a')
      this.operationModalTitle = 'ADD'; 
    else if(type=='w')
      this.operationModalTitle = 'WITHDRAW';
      
      if(this.selectedVal=="mobileDrawer")
      drawer="m";
    else if(this.selectedVal=="accDrawer")
      drawer="a";
    else 
      drawer="s";
    this.operationForm = this.fb.group({
      op_type: [type],
      drawer: [drawer],
      amount: [ 0,Validators.min(1)],
      comment: [''],
      // clientID:[MobileDrawerComponent.selectedClientID]
    });
    // this.paymentForm = this.fb.group({
    //   amount: [amount, [Validators.required,Validators.max(AccessoriesDrawerComponent.selectedRowData['debit'])]],
    //   clientID:[AccessoriesDrawerComponent.selectedClientID]
    // });

  }

  addNewOperation(){
    this.drawerService.newOperation(this.operationForm.value).subscribe(Response => {
      this.selectedVal= "drawer/"+this.selectedVal;
      // this.router.navigate(["drawer/"]);
      this.router.navigate([this.selectedVal]);
      // location.reload()


      if(this.operationForm.get("drawer").value=='m')
        this.globalMobileDrawerDT.ajax.reload(null, false);
      if(this.operationForm.get("drawer").value=='a')
        // this.globalAccDrawerDT.ajax.reload(null, false);
      if(this.operationForm.get("drawer").value=='s')
        // this.globalInternetDrawerDT.ajax.reload(null, false);
      // navigateToSubsc() {
        // this.router.navigate(['drawer/mobileDrawer']);
        //, { queryParams: { searchName: SubscribersComponent.selectedRowData['name'] } }
      // }
      swal({
        type: 'success',
        title: 'Success',
        text:'Operation Successfully',
        showConfirmButton: false,
        timer: 1000
      });
    }, error => {
      swal({
        type: 'error',
        title: error.statusText,
        text:error.message
      });
    });
    this.modalReference.close();
  }
}