import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { TaskService } from '../task.service';
import { MenuComponent } from '../../../shared/menu/menu/menu.component';
import { tap } from 'rxjs';
import { Task } from '../tarea.types';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule,MenuComponent,FormsModule,ReactiveFormsModule, RouterModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit{
  taskForm !: FormGroup ;
  task : any;
  id !: number;

  constructor(private _taskService : TaskService, private _router : Router, private route: ActivatedRoute) { 
  }
  ngOnInit(): void {
    
    this.route.params.subscribe((params: Params) => {
      const id = +params['id']; // El '+' convierte el parámetro de cadena a número
      this.id = id;
      console.log('ID from URL:', id);
  
      // Ahora puedes usar el id como desees en tu componente.
    });
    this.task = this._taskService.getTask(this.id).subscribe(
      (data) => {
        this.task = data;
        this.taskForm.patchValue({
          name: this.task.name
        });
        console.log(this.task);
      },
      (error) => {
        console.error(error);
      }

    );
    this.taskForm = new FormGroup({
      name: new FormControl(this.task.name)
    });
    //this.patchInfoToForm();
    
  }

  patchInfoToForm(){
    this.taskForm.patchValue({
      name: this.task.name
    });
  }

  updateTask(){
    console.log(this.taskForm.value);
    this._taskService.editTask(this.taskForm.value, this.id).subscribe(
      res => {
        console.log(res);
        this._router.navigate(['/tasks']);
      },
      err => console.log(err)
    );

  }

  cancel(){
    this._router.navigate(['/tasks']);
  }

  


}

