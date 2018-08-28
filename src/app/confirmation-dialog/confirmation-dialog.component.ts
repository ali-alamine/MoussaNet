import { Component, Inject, OnInit,HostListener,ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  
  private title;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,@Inject(MAT_DIALOG_DATA) public data) {}

    ngOnInit(){
      this.title=this.data.title;
    }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public cancel() {
    this.dialogRef.close('close cancel');
    this.close();
  }

  public close() {
    this.dialogRef.close();
  }

  public delete() {
    
    this.dialogRef.close('delete');

    this.close();
  }

 
}






