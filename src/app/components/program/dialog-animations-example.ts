import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { DialogAnimationsExampleDialog } from "./dialog-animations-example-dialog";

@Component({
    selector: 'dialog-animations-example',
    template: `
    <button mat-raised-button (click)="openDialog('0ms', '0ms')">Open dialog without animation</button>

    `,
    standalone: true,
    styles: [``],
    imports: [MatButtonModule],
  })
  export class DialogAnimationsExample {
    constructor(public dialog: MatDialog) {}
  
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(DialogAnimationsExampleDialog, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
  }