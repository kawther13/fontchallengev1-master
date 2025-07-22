import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 
  loginForm: FormGroup;
  showPassword = false;
  errorMessage = '';
successMessage = '';


  constructor(
    private fb: FormBuilder,
    private _data: LoginService,
    private router: Router  // ✅ injecte le Router
  ) {
    this.loginForm = this.fb.group({
      matricule: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
  if (this.loginForm.valid) {
    const { matricule, password } = this.loginForm.value;

    this._data.login({ username: matricule, password }).subscribe({
      next: (response) => {
        if (response.success) {
          const role = localStorage.getItem('role');

          this.successMessage = 'Connexion réussie !';
          this.errorMessage = ''; // on vide l'erreur si succès

          if (role === 'ADMIN') {
            this.router.navigate(['home/dashbordadmin']);
          } else if (role === 'SALARIE'|| role === 'AGENT') {
            this.router.navigate(['home/dahpoPar']);
          } else {
            this.router.navigate(['/']);
          }
        } else {
          this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
          this.successMessage = '';
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Erreur serveur.';
        this.successMessage = '';
      }
    });
  } else {
    this.errorMessage = 'Veuillez remplir tous les champs.';
    this.successMessage = '';
  }
}

}