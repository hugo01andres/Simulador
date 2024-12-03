import { Routes } from '@angular/router';
import { TaskListComponent } from './modules/tarea/tarea-list/task-list.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { sessionGuard } from './core/guards/session.guard';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    {
        path: 'tasks',
        loadChildren: () => import('./modules/tarea/task.routes').then(m => m.taskRoutes),
        canActivate: [sessionGuard]
    },
    {
        path: 'auth',
        component: LoginComponent
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [sessionGuard]
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];
