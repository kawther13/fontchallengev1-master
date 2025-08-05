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
role1:'' | undefined;
  constructor(
    private fb: FormBuilder,
    private _data: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

 onSubmit() {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;

    this._data.login({ email, password }).subscribe({
      next: (res) => {
        // ✅ Stocker les tokens d'abord
        localStorage.setItem('jwt', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);

        // ✅ Ensuite, on peut lire le rôle depuis le token
        const role = this._data.getRoleFromToken();
        console.log("Rôle :", role);

        this.successMessage = 'Connexion réussie !';
        this.errorMessage = '';

        // ✅ Redirection selon le rôle
        if (role === 'ADMIN') {
          this.router.navigate(['home/dashbordadmin']);
        } else if (role === 'SALARIE' || role === 'AGENT') {
          this.router.navigate(['home/dahpoPar']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
        this.successMessage = '';
      }
    });
  } else {
    this.errorMessage = 'Veuillez remplir tous les champs.';
    this.successMessage = '';
  }
}

}