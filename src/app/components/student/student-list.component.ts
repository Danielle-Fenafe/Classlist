import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { Student } from '../../types/Student';
import { DialogAnimationsExample } from "./dialog-animations-example";
import { DialogAnimationsExampleDialog } from "./dialog-animations-example-dialog";



/**export interface Student {
    id: string;
  firstName: string;
  lastName: string;
  gender: string;
  program: string;
}

const STUDENT_DATA: Student[] = [
  {id: '1', firstName: 'Mbi', lastName: 'Belvine Ana', gender: 'F',program: 'Marketing'},
  {id: '2', firstName: 'Nkeng', lastName: 'Joshoua', gender: 'M',program: 'Web Designing'},
  {id: '3', firstName: 'Efeti', lastName: 'Liela', gender: 'F',program: 'Graphics'},
  {id: '4', firstName: 'Kami', lastName: 'Ryan Favel', gender: 'M',program: 'Marketing'},
  {id: '5', firstName: 'Fotso', lastName: 'Eric', gender: 'M',program: 'AI'},
  {id: '6', firstName: 'kwai', lastName: 'Belvins Rein', gender: 'F',program: 'Front-end Engineering'},
  {id: '7', firstName: 'kinssly', lastName: 'Ozil', gender: 'M',program: 'Back-end Engineering'},
  {id: '8', firstName: 'Dona', lastName: 'Ketelyne', gender: 'F',program: 'Front-end Engineering'},
  {id: '9', firstName: 'Atangana', lastName: 'Catherina', gender: 'F',program: 'AI'},
]; */

@Component({
    standalone: true,
    selector: 'app-student-list',
    imports: [
        MatTableModule,
        MatCheckboxModule, 
        MatButtonModule, 
        MatInputModule, 
        MatFormFieldModule,
        DialogAnimationsExample,
        DialogAnimationsExampleDialog
        
],
    template:`
    <div>
        <h4>Student List</h4>
        <div class="top-nav">
             <div>
                <b>Total: {{dataSource.data.length}}</b>
             </div>            
              <div>
                <b>Filtered: {{dataSource.filteredData.length}}</b>
              </div>
              <div>
                <b>Selected: {{selection.selected.length}}</b>
              </div>
              <div></div>
              <div class="top3">
                <mat-form-field>
                    <mat-label >Type name, program or gender</mat-label>
                    <input  matInput (keyup)="applyFilter($event)" placeholder="Type name, program or gender" #input>
                </mat-form-field>    
              </div>
              <div class="top2">
                <button mat-stroked-button class="assign" (click)="handleClick('assign-program','')">Assign Programs</button>
              </div>
              <div class="top2">
                <button class="button" mat-stroked-button (click)="handleClick('create','')">Create</button>
              </div>
        </div>

        <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

        <ng-container matColumnDef="select">
          <th mat-header-cell *matHeaderCellDef>
            <mat-checkbox (change)="$event ? toggleAllRows() : null"
                          [checked]="selection.hasValue() && isAllSelected()"
                          [indeterminate]="selection.hasValue() && !isAllSelected()"
                          [aria-label]="checkboxLabel()">
            </mat-checkbox>
          </th>
          <td mat-cell *matCellDef="let row">
            <mat-checkbox (click)="$event.stopPropagation()"
                          (change)="$event ? selection.toggle(row) : null"
                          [checked]="selection.isSelected(row)"
                          [aria-label]="checkboxLabel(row)">
            </mat-checkbox>
          </td>
        </ng-container>
      
        <ng-container matColumnDef="position">
          <th mat-header-cell *matHeaderCellDef> No. </th>
          <td mat-cell *matCellDef="let element let i = index" id="id"> {{i + 1}} </td>
         
        </ng-container>
      
        <ng-container matColumnDef="firstName">
          <th mat-header-cell *matHeaderCellDef> FirstName </th>
          <td mat-cell *matCellDef="let element"> {{element.firstName}} </td>
        </ng-container>
      
        <ng-container matColumnDef="lastName">
          <th mat-header-cell *matHeaderCellDef> Lastname </th>
          <td mat-cell *matCellDef="let element"> {{element.lastName}} </td>
        </ng-container>
      
        <ng-container matColumnDef="gender">
          <th mat-header-cell *matHeaderCellDef> Gender </th>
          <td mat-cell *matCellDef="let element"> {{element.gender}} </td>
        </ng-container>

              <ng-container matColumnDef="program">
          <th mat-header-cell *matHeaderCellDef> Program </th>
          <td mat-cell *matCellDef="let element"> {{element.program}} </td>
        </ng-container>
        
        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef> Action </th>
          <td mat-cell *matCellDef="let element">
        
          <div class="example-button-row">
                <button class="action" mat-stroked-button color="warn" (click)="handleClick('delete', element.id)">Delete</button>
                <button  class="action" mat-stroked-button color="primary" (click)="handleClick('edit', element.id)">Edit</button>
                <button  class="action" mat-stroked-button color="accent"(click)="handleClick('detail', element.id)">Detail</button>
          </div>
        </td>
        </ng-container>
        
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;">
        </tr>
      </table>
    </div>
    
    `,
    styles: [`
    .top-nav {
        display: flex;
        flex-direction: row;
       padding: 10px 0;
       // border:1px solid black;
        height:50px;
    .top-nav > div {
      padding: 5px;
    }   
       
    }
  
    .top-nav > div:nth-child(4){
        flex-grow: 1;
    }
    table {
        width: 100%;
    }
    .action{
      margin:3px
    }
    
    .button {
      background: lightgreen 60%;
      stroke: 80% black;
      color:white !important;
    }
    .assign{
      background:#2ebbaa;
      stroke: 80%;
      color:white !important;
    }
    
    .top2{
      margin:2x;
    }
    .top3{
      margin:3px;
      height:5px;
    }
    tr:nth-child(even) {
      background: #f3f3f3;
    }
    th{
      background-color: #2ebbaa !important;
      color: white !important;
    }
    `]
})
export class StudentListComponent implements OnInit, OnChanges {

    @Input() students: Student[] = [];
    @Output() onAction: EventEmitter<any> = new EventEmitter();

    displayedColumns: string[] = ['select', 'position', 'firstName', 'lastName', 'gender', 'program', 'action'];
    dataSource = new MatTableDataSource<Student>([]);
    selection = new SelectionModel<Student>(true, []);
  
    ngOnInit() {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.dataSource.data = this.students;
    }

    ngOnChanges(changes: SimpleChanges): void {
      //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
      //Add '${implements OnChanges}' to the class.
      if(changes['students']) {
        this.dataSource.data = changes['students'].currentValue;
      }
    }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
  
      this.selection.select(...this.dataSource.data);
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Student): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'}row`;
      //return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

    handleClick(action: string, id: string) {
      this.onAction.emit({action, id})
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }