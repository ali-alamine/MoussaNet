import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})
export class SupplyComponent implements OnInit {
  supplyForm:FormGroup;
  constructor(private fb: FormBuilder) { }
  
  ngOnInit() {
    this.supplyForm = this.fb.group({
      email: '',
      items: this.fb.array([])
    })
  
  }
  
  get itemsForm() {
    return this.supplyForm.get('items') as FormArray
  }
  
  addItem() {
  
    const item = this.fb.group({ 
      itemName: [],
      itemPrice: [],
      itemQunatity: []
    })
  
    this.itemsForm.push(item);
  }
  
  deleteItem(i) {
    this.itemsForm.removeAt(i)
  }

}
