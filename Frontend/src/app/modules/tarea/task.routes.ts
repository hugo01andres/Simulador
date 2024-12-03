import { Routes } from "@angular/router";
import { TaskListComponent }  from "../tarea/tarea-list/task-list.component";
import { CreateTaskComponent } from "./create-task/create-task.component";
import { sessionGuard } from "../../core/guards/session.guard";
import { EditTaskComponent } from "./edit-task/edit-task.component";
import { DeleteTaskComponent } from "./delete-task/delete-task.component";

export const taskRoutes: Routes = [
    {
        path: '',
        component: TaskListComponent
    },
    {
        path: 'create',
        component: CreateTaskComponent
    },
    {
        path: 'edit/:id',
        component: EditTaskComponent
    },
    {
        path: ':id',
        component: DeleteTaskComponent
    }

];

