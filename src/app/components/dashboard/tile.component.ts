import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-welcome-tile',
  imports: [CommonModule, MatCardModule],
  template: `
      <mat-card class="tile" (click)="handleClick()">
      <div class="count">{{count}}</div>
      <br />
      <div>{{title}}</div>
      </mat-card>
      `,
  styles: [`
      .tile {
        text-align: center !important;
        padding:24px;
        background-color: #2ebbaa;
        margin: 2px;
      }
      mat-card-header> div {
        display:block;
      }
      .count {
        font-size: 20px;
        font-weight: bold
      }
      `]
})
export class TileComponent {
  @Input() title: string = '';
  @Input() count: string = '';
  @Output() onAction = new EventEmitter<void>();

  handleClick() {
    this.onAction.emit();
  }
}