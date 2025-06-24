import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
role: any
 ngOnInit():void{

    //this.user= this._user.getuserDataFromToken();
    const role = localStorage.getItem('role');
    const  username=localStorage.getItem('username')
  }
constructor(private router :Router ){}

  logout(){
 localStorage.removeItem('token');
 
  localStorage.removeItem('role');
this.router.navigate(['/login']).then(() => {
  setTimeout(() => {
    window.location.reload();
  }, 100); // 100ms pour laisser le temps au navigateur d'enregistrer la suppression
});

// lina juste 9a3da na3mel fi refrech lel app  w deja token tefskha kif iji  yedkhol yal9a gard moch bech ikhalih yedkhol  khter fmch token
    }
}
