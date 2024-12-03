import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TaskService } from '../task.service';
import { TaskList } from '../tarea.types';
import { MenuComponent } from '../../../shared/menu/menu/menu.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Route, Router, RouterModule } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatSlideToggleModule, MenuComponent, 
    MatTableModule, MatIconModule, CommonModule, MatButtonModule,
     RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  
  listTasks : TaskList[] = [];
  public mostrarLoader: boolean = false;
  columnsToDisplay = ['id', 'name', 'action'];
  constructor(private _taskService : TaskService, private _router : Router, public dialog: MatDialog, private cd: ChangeDetectorRef) { 
    
  }
  ngOnInit(): void {
    this.getTaskList().subscribe(list => {
      this.listTasks = list;
      console.log(this.listTasks);
    }
    );
    
  }

  getTaskList() : Observable<TaskList[]>{
    return this._taskService.getTaskList();
  }
  redirectEdit(id: number): void {
    this._router.navigate(['/tasks/edit', id]);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: number): void {
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {taskId: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTaskList().subscribe(updatedList => {
        this.listTasks = updatedList;
        console.log('The dialog was closed', result);
        this.cd.detectChanges();
      });
    });
    this.reloadPage();
  }
  // Simula una operación asíncrona que lleva tiempo
  realizarOperacionAsincrona() {
    // Supongamos que esta operación asincrona tarda 2 segundos
    setTimeout(() => {
      // Después de completar la operación, oculta el loader
      this.mostrarLoader = false;
    }, 2000);
  }
  reloadPage(): void {
    this._router.navigateByUrl('/tasks', { skipLocationChange: true }).then(() => {
      this._router.navigate([this._router.url]);
    });
  }
}
