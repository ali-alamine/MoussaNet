import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { OmtService } from "./omt.service";

@Component({
  selector: "app-omt",
  templateUrl: "./omt.component.html",
  styleUrls: ["./omt.component.css"]
})
export class OmtComponent implements OnInit {
  modalReference: any;
  private wuForm;
  private intraForm;
  options;
  intraIsDollar = true;
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private omtService: OmtService
  ) {}

  ngOnInit() {}

  openWUModal(wuModal) {
    this.modalReference = this.modalService.open(wuModal, {
      centered: true,
      ariaLabelledBy: "modal-basic-title"
    });

    this.wuForm = this.fb.group({
      operationType: ["wu"],
      currency: ["p", Validators.required],
      amountD: ["", [Validators.required, Validators.min(1)]],
      amountL: ["", [Validators.required, Validators.min(1)]],
      clientName: [""],
      clientID: [-1]
    });

    this.wuOnAmountDChange();
    this.wuOnClientNameChange();
  }

  wuOnAmountDChange(): void {
    this.wuForm.get("amountD").valueChanges.subscribe(val => {
      var amountD = +this.wuForm.get("amountD").value;
      var amountLL = amountD * 1500;
      this.wuForm.get("amountL").setValue(amountLL);
    });
  }

  wuOnClientNameChange(): void {
    this.wuForm.get("clientName").valueChanges.subscribe(val => {
      var data = this.wuForm.get("clientName").value;
      if (data == "") {
        this.options = [];
        return;
      }
      this.omtService.searchClient(data).subscribe(Response => {
        this.options = Response;
      });
    });
  }

  wuSetClient(id) {
    this.wuForm.controls["clientName"].disable();
    this.wuForm.get("clientID").setValue(id);
  }

  wuClearClientName() {
    this.wuForm.controls["clientName"].enable();
    this.wuForm.get("clientName").setValue("");
    this.wuForm.get("clientID").setValue(-1);
  }

  addWuOperation() {
    console.log(this.wuForm.value);
  }



  openIntraModal(intraModal) {
    this.modalReference = this.modalService.open(intraModal, {
      centered: true,
      ariaLabelledBy: "modal-basic-title"
    });

    this.intraForm = this.fb.group({
      operationType: ["in"],
      tranType: ["p", Validators.required],
      currency: ["d", Validators.required],
      amountD: ["", [Validators.required, Validators.min(1)]],
      amountL: [""],
      clientName: [""],
      clientID: [-1]
    });

    this.intraOnAmountDChange();
    this.intraOnClientNameChange();
    this.intraCurrencyChange();
  }
  intraCurrencyChange(): any {
    this.intraForm.get("currency").valueChanges.subscribe(val => {
      if(val == 'l')
        this.intraIsDollar = true;
      else
        this.intraIsDollar = false;
      console.log(this.intraIsDollar)
    });
  }

  intraOnAmountDChange(): void {
    this.intraForm.get("amountD").valueChanges.subscribe(val => {
      var amountD = +this.intraForm.get("amountD").value;
      var amountLL = amountD * 1500;
      this.intraForm.get("amountL").setValue(amountLL);
    });
  }

  intraOnClientNameChange(): void {
    this.intraForm.get("clientName").valueChanges.subscribe(val => {
      var data = this.intraForm.get("clientName").value;
      if (data == "") {
        this.options = [];
        return;
      }
      this.omtService.searchClient(data).subscribe(Response => {
        this.options = Response;
      });
    });
  }

  intraSetClient(id) {
    this.intraForm.controls["clientName"].disable();
    this.intraForm.get("clientID").setValue(id);
  }

  intraClearClientName() {
    this.intraForm.controls["clientName"].enable();
    this.intraForm.get("clientName").setValue("");
    this.intraForm.get("clientID").setValue(-1);
  }

  addIntraOperation() {
    console.log(this.intraForm.value);
  }



  
}
