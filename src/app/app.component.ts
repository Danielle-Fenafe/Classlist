import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Main_MENU } from './outils/constants';
import { DialogAnimationsExample } from "./components/student/dialog-animations-example";
@Component({
    selector: 'app-root',
    standalone: true,
    styleUrl: './app.component.scss',
    templateUrl: './app.component.html',
    imports: [CommonModule, RouterOutlet, DialogAnimationsExample]
})
export class AppComponent {
  title = 'client-angular';
  menu = Main_MENU;


constructor(
   private router: Router
) {

}

 handleNav(path: string) {
     this.router.navigate([path])
 }
  }
