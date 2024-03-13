import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './student-list.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from './student-form.component';
import { STUDENT_DATA } from '../../outils/data/student';
import { Student } from '../../types/Student';
import { DialogAnimationsExampleDialog } from './dialog-animations-example-dialog';
import { DialogAnimationsExample } from './dialog-animations-example';
import { StudentService } from '../../services/student.service';
@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, StudentListComponent, DialogAnimationsExampleDialog, DialogAnimationsExample],
  template: `
    <div>
        <h3>Student</h3>
        <app-student-list
          [students] = "students"
          (onAction)="handleAction($event)"></app-student-list>
    </div>
  `,
  styles: [`
  
  `]
})
export class StudentComponent implements OnInit {
  title = 'client-angular';
  name = 'Tester';
  animal = 'test'
  students: Student[] = [];
  initStudent: Student = {
    id: '',
    firstName: '',
    lastName: '',
    gender: '',
    program: ''
  };

  student: Student | null = null;
  studentService:any = inject(StudentService);


  constructor(public dialog: MatDialog) {}

  ngOnInit() {
   // this.students = STUDENT_DATA;
    this.studentService.getAll()
      .subscribe({
        next: (val: any) => {
          const newRec: any[] = [];
            const { data } = val;
            this.students = data;
            
          
         /* data.forEach(function(el:any) {
             const names = el.name.Split(' ');
             el.firstName = names[0];
             el.lastName = names[1] || '';
             newRec.push(el);
          });
          
          this.students = newRec;
          */
        }
        
      })
  }

  openDialog(isEdit = false): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '60%',
      data: !isEdit ? {...this.initStudent} : this.student,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id === '') {
          this.studentService.save(result)
            .subscribe({
              next: (val: any) => {}
            })
          const students = this.students
          const count = this.students.length;
          result.id = `${count + 1}`;
          students.push(result);
          this.students = [...students];
        } else {
          const student: any = this.students.find((obj) => obj.id === result.id);
          const i = this.students.indexOf(student);
          this.students[i] = result;
        }
      }
    });
  }

  openDeleteDialog(id: any, enterAnimationDuration: string, exitAnimationDuration: string) {
    const deleteRef = this.dialog.open(DialogAnimationsExampleDialog, {
      data: id,
      enterAnimationDuration,
      exitAnimationDuration

    });

    deleteRef.componentInstance.onDelete.subscribe({
      next: (val: any) => {
        const students = this.students;
        this.students = students.filter((obj: any) => obj.id !== val);
      }
    })
  }
  
  handleAction(event: any) {
    switch(event.action) {
      case 'create':
        this.openDialog();
        break;
      case 'edit':
        this.student = this.students.find((obj) => obj.id === event.id) || null;
        this.openDialog(true);
        break;
      case 'delete':
        this.openDeleteDialog(event.id, '1000ms', '500ms');
        break;
      default:
        ;
    }
  }
}