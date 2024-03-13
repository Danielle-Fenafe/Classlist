import { Component, EventEmitter, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'dialog-animations-example-dialog',
    template: `
    <h2 mat-dialog-title style="margin-left: 70px;">Delete Student</h2>
<mat-dialog-content>
  Are you sure you want to delete?<br style="font-size: 14px; margin-left: 50px;"> This action is irreversible!
</mat-dialog-content>
<mat-dialog-actions>
  <button mat-button mat-dialog-close style="margin-left: 15px; background-color: #2ebbaa; color: white;">No</button>
  <button mat-button mat-dialog-close (click)="OnbottonClick()" cdkFocusInitial style="margin-left: 120px; background-color: #E82020; color: white;">Yes</button>
</mat-dialog-actions>

    `,
    styles: [``],
    standalone: true,
    imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  })
  export class DialogAnimationsExampleDialog {
    onDelete= new EventEmitter();
    constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {}
    OnbottonClick() {
        this.onDelete.emit(this.data)
    }


  }