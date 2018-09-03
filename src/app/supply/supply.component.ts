import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { SupplyService } from './supply.service';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})
export class SupplyComponent implements OnInit {
  supplyForm: FormGroup;
  options;
  constructor(private fb: FormBuilder, private supplyService: SupplyService) { }

  ngOnInit() {
    this.supplyForm = this.fb.group({
      supplyDate: '',
      supplierName: ['', Validators.required],
      searchSupplier: '',
      supplierID: '',
      totalPrice: 0,
      items: this.fb.array([])
    });
    // this.onChanges();
    this.onSupplierNameChange();

  }
  onSupplierNameChange(): void {
    this.supplyForm.get('searchSupplier').valueChanges.subscribe(val => {
      var data = this.supplyForm.get('searchSupplier').value;
      if (data == "") {
        this.options = [];
        return;
      }
      this.supplyService.searchSupplier(data).subscribe(Response => {
        this.options = Response;
      })
    });
  }
  onChanges(): void {    
    this.itemsForm.valueChanges.subscribe(values => {
      var total = 0;
      for (var i = 0; i < this.itemsForm.controls.length; i++) {
        var price = this.itemsForm.controls[i].get('itemPrice').value;
        total = total + price;
      }
      this.supplyForm.get('totalPrice').setValue(total);
    });

  }

  get itemsForm() {
    return this.supplyForm.get('items') as FormArray
  }

  get itemPrice() {
    return this.itemsForm.controls[0].get('itemPrice');
  }

  addItem() {
    const item = this.fb.group({
      itemName: [],
      itemPrice: [0],
      itemQunatity: [0]
    });
    this.itemsForm.push(item);
    this.onChanges();
  }

  deleteItem(i) {
    this.itemsForm.removeAt(i);
    this.onChanges();
  }

  submitSupplyInvoice() {
    console.log(this.supplyForm.value)
  }

  test(id, name) {
    this.supplyForm.get('searchSupplier').setValue('');
    this.supplyForm.get('supplierName').setValue(name);
    this.supplyForm.get('supplierID').setValue(id);
  }

}
