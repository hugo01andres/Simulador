import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  //Forms using material
  name = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  constructor(private authService: AuthService, private router : Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    console.log('Register component loaded');
    
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


  register(){
    this.authService.register(this.name.value, this.username.value , this.email.value , this.password.value).subscribe(
      (data) => {
        console.log(data);
        this.showSuccessSnackBar('Usuario creado correctamente');
        this.router.navigate(['/auth']);

      },
      (error) => {
        console.error(error);
        this.showSuccessSnackBar('Error al crear el usuario');
      }
    );
  }

  private showSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      horizontalPosition: 'center',
      verticalPosition: 'top' as MatSnackBarVerticalPosition, // Posición en el centro
      panelClass: ['mat-toolbar', 'mat-primary', 'centered-snackbar'], // Clases de estilo personalizadas
    });
  }

  //TODO: Create a dialog to show the error

}
