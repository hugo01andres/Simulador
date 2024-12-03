import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly LoginURL = environment.apiUrl + '/auth/login';
  private readonly RegisterURL = environment.apiUrl + '/users/register';
  token : Observable<string> = new Observable<string>();
  constructor(private http: HttpClient, private cookie : CookieService) { }

  sendCredentials(username: string, password: string) {
    const body = { username, password };
    console.log(body);
    console.log(this.LoginURL);
    return this.http.post(`${this.LoginURL}`, body).pipe(
      tap((responseOk: any) =>{
        const { token } = responseOk; //{token : 'jdjdjs'} lo que hago es parsearlo
        this.cookie.set('Authorization', token, 2, '/');
        console.log(this.cookie.get('Authorization'));
        
      })
    );
  }

  register(name:string | null, username:string| null, email:string |null, password:string | null) {
    const body = { name, username, email, password };
    return this.http.post(`${this.RegisterURL}`, body);
  }
}
