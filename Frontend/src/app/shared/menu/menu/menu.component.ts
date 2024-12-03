import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TaskListComponent } from '../../../modules/tarea/tarea-list/task-list.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, TaskListComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  constructor(private router: Router, private cookieService: CookieService) { }
  ngOnInit(): void {
  }

  toTareas(){
    this.router.navigate(['tasks']);
  }

  logOut(){
    this.cookieService.delete('Authorization');
    this.router.navigate(['auth']);
  }

}
