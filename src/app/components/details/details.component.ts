import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Task } from '../../types/Details';


@Component({
    selector: 'app-details',
    standalone: true,
    template: `
    <div style="margin-left: 15px;">
        <h3>Student Details</h3><br>
        <h4>Programs</h4>
    </div>
    <div>
        <button class="button" mat-stroked-button style="margin-left: 750px; background-color: #2ebbaa; color: white;" >Update</button>
              </div>
 
    <section class="example-section">
  <span class="example-list-section">
    <mat-checkbox class="example-margin"
                  [checked]="allComplete"
                  [indeterminate]="someComplete()"
                  (change)="setAll($event.checked)">
      {{task.name}}
    </mat-checkbox>
  </span>
  <span class="example-list-section">
    <ul>
      @for (subtask of task.subtasks; track subtask) {
        <li>
          <mat-checkbox [(ngModel)]="subtask.completed"
                        (ngModelChange)="updateAllComplete()">
            {{subtask.name}}
          </mat-checkbox>
        </li>
      }
    </ul>
  </span>
</section>

  `,
    styles: [`
  
  `],
    imports: [CommonModule, MatButtonModule, FormsModule, MatCheckboxModule]
})
export class DetailsComponent {
  task: Task = {
    name: 'All programs',
    completed: false,
    subtasks: [
      {name: 'Front-end Engineering', completed: false },
      {name: 'Back-end Engineering', completed: false },
      {name: 'Web Designing', completed: false},
      {name: 'Marketing', completed: false},
      {name: 'AI', completed: false},
      {name: 'Data Analysis', completed: false},
    ],

} 
allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

}
