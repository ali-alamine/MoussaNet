import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DrawerService } from "../drawer/drawer.service";
declare var $: any;
@Component({
  selector: "app-drawer-omt",
  templateUrl: "./drawer-omt.component.html",
  styleUrls: ["./drawer-omt.component.css"]
})
export class DrawerOmtComponent implements OnInit {
  modalReference: any;
  operationModalTitle: string;

  operationForm;
  transferForm: any;
  constructor(
    private drawerService: DrawerService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    route: ActivatedRoute
  ) {}

  ngOnInit() {}

  openOperationModal(openModal, type) {
    this.modalReference = this.modalService.open(openModal, {
      centered: true,
      backdrop: 'static',
      ariaLabelledBy: "modal-basic-title"
    });
    if (type == "a") this.operationModalTitle = "Add";
    else if (type == "w") this.operationModalTitle = "Withdraw";

    this.operationForm = this.fb.group({
      op_type: [type],
      drawer: ["O"],
      amount: [0, Validators.min(1)],
      comment: [""]
    });
  }

  addNewOperation() {
    this.drawerService.newOperation(this.operationForm.value).subscribe(
      Response => {
        // this.internetDrawer = "";
        // $("#internetDrawerDT").DataTable().destroy();
        // $("#internetDrawerDT").empty();
        // this.getInternetDrawerDT();
        swal({
          type: "success",
          title: "Success",
          text: "Operation Added Successfully",
          showConfirmButton: false,
          timer: 1000
        });
      },
      error => {
        swal({
          type: "error",
          title: error.statusText,
          text: error.message
        });
      }
    );
    this.modalReference.close();
  }

  openTransferModal(transferModal) {
    this.modalReference = this.modalService.open(transferModal, {
      backdrop: 'static',
      centered: true,
      ariaLabelledBy: "modal-basic-title"
    });

    this.transferForm = this.fb.group({
      toDrawer: ["", Validators.required],
      fromDrawer: ["", Validators.required],
      amount: [0, Validators.min(1)],
      comment: [""]
    });
  }

  submitransfer() {
    if (this.transferForm.get("toDrawer").value == this.transferForm.get("fromDrawer").value) 
    {
      swal({
        type: "error",
        title: "Error",
        text: "from and to drawer must be different"
      });
      return;
    }

    this.drawerService.newTransferOperation(this.transferForm.value).subscribe(
      Response => {
        // this.internetDrawer = "";
        // $("#internetDrawerDT").DataTable().destroy();
        // $("#internetDrawerDT").empty();
        // this.getInternetDrawerDT();
        swal({
          type: "success",
          title: "Success",
          text: "Transform Compeleted Successfully",
          showConfirmButton: false,
          timer: 1000
        });
      },
      error => {
        swal({
          type: "error",
          title: error.statusText,
          text: error.message
        });
      }
    );
    this.modalReference.close();
  }
}
