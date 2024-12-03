import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Task, TaskList } from './tarea.types';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private endpointURL = environment.apiUrl + '/tasks';
  listTask : Observable<Task[]> = new Observable<Task[]>();
  task : Observable<Task> = new Observable<Task>();
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getTaskList(): Observable<TaskList[]> {
    const headers = this.createHeaders();
    const options = { headers };
    return this.http.get<TaskList[]>(this.endpointURL).pipe(
      //Order by id
      tap((data) => {
        data.sort((a, b) => a.id - b.id);
      })
    )
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.endpointURL}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.endpointURL, task);
  }

  editTask(task: Task, id: number): Observable<Task> {
    return this.http.put<Task>(`${this.endpointURL}/${id}`, task);
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.endpointURL}/${id}`);
  }

  createHeaders() {
    const authToken = this.cookieService.get('Authorization');
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
  
    console.log(headers);
    return headers;
  }

}
