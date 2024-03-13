import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Route,Router } from "@angular/router";
import { TileComponent } from './tile.component';

@Component({
    standalone: true,
    selector: 'app-dashboard',
    imports: [CommonModule, TileComponent],
    template:`
    <div class="dashboard">
       <h3>Welcome to....</h3>  

        <div class="tiles">
            <app-welcome-tile class="box"
            [title]=" 'Students' "
            [count]=" '09' "
            (onAction)="handleNav('/students')"
            ></app-welcome-tile>
            <app-welcome-tile class="box"
            [title]=" 'Programs' "
            [count]=" '06' "
            (onAction)="handleNav('/programs')"
            ></app-welcome-tile>
        </div>
    </div>
     `,
     styles: [`
     .dashboard {
        width: 100%;
  
     }
     .tiles {
         display: flex;
         flex-direction: row;
         justify-content: space-around;
         
     }
     .tiles app-welcome-tile {
        flex-grow: 1;
        max-width: 500px;
        
     }
     
     `]
    })
    export class WelcomeComponent {
        title= 'client aqngular';

    constructor(
        private router: Router
    ) {

    }

    handleNav(path: string) {
        this.router.navigate([path])
    }
     }