import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: boolean = false;

  constructor(private _loginService : AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
    console.log('LoginComponent');
    
  }

  login(){
    this._loginService.sendCredentials(this.loginForm.value.username, this.loginForm.value.password)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['']);
      },
      error => {
        // Handle error
        console.error(error);
        //Show user or password wrong
        this.invalidLogin = true;
        
      }
    );
  }
}
