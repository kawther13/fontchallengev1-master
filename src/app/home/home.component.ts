import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Chart } from 'chart.js/auto';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
constructor(private router :Router ){}
role: string = '';
  ngOnInit(): void {
    this.role = localStorage.getItem('role') || '';
  }

  ngAfterViewInit(): void {
    this.toggleSidebar();
   // this.createChart();
  }

  toggleSidebar() {
    const hamburger = document.querySelector(".toggle-btn");
    const toggle = document.querySelector("#icon");

    hamburger?.addEventListener("click", () => {
      document.querySelector("#sidebar")?.classList.toggle("expand");
      toggle?.classList.toggle("bxs-chevrons-right");
      toggle?.classList.toggle("bxs-chevrons-left");
    });
  }
/*
  createChart() {
    new Chart(document.getElementById("bar-chart-grouped") as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels: ["1900", "1950", "1999", "2050"],
        datasets: [
          {
            label: "Africa",
            backgroundColor: "#3e95cd",
            data: [133, 221, 783, 2478]
          },
          {
            label: "Europe",
            backgroundColor: "#8e5ea2",
            data: [408, 547, 675, 734]
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Population growth (millions)'
          }
        }
      }
    });
  }*/
  logout(): void {
  // Supprimer uniquement les éléments réellement utilisés
  localStorage.removeItem('jwt');
  localStorage.removeItem('refresh_token');

  // Rediriger vers login
  window.location.href = '/login'; // plus rapide que navigate + reload
}


// lina juste 9a3da na3mel fi refrech lel app  w deja token tefskha kif iji  yedkhol yal9a gard moch bech ikhalih yedkhol  khter fmch token
    }
