import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../shared/menu/menu/menu.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [MenuComponent, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit{
  taskForm!: FormGroup;
  private _taskService: TaskService;
  private _router: Router;
  constructor(private taskService: TaskService, private router: Router){
    this._taskService = taskService;
    this._router = router;
  }
  ngOnInit(): void {
    this.taskForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  createTask(){
    console.log(this.taskForm.value);
    this._taskService.createTask(this.taskForm.value).subscribe(
      res => {
        console.log(res);
        this._router.navigate(['/tasks']);

      },
      err => console.log(err)
    );

  }

}
