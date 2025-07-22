import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';


import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartType
} from 'chart.js';
import { HttpErrorResponse } from '@angular/common/http';
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);
@Component({
  selector: 'app-dashbord-admin',
  standalone: true,
  imports: [CommonModule,FormsModule,NgChartsModule],
  templateUrl: './dashbord-admin.component.html',
  styleUrl: './dashbord-admin.component.css'
})
export class DashbordAdminComponent {
  
searchTerm: string = '';
stats: any = null;
revenuChefRegionChart: Chart | undefined;
inputFocused: boolean = false;
buttonClicked: boolean = false;

constructor(private dashboardService: DashboardService) {}

 ngOnInit(): void {
    this.getChallengesEnCours();

 this.loadRevenuParChallengeChart()
  
  }

searchChallenge() {
  this.buttonClicked = true;
  if (this.searchTerm.trim()) {
    const challengeName = this.searchTerm.trim();

    this.dashboardService.getStatsByChallengeName(challengeName).subscribe({
      next: data => {
        this.stats = data;
        this.loadRevenuChefRegionChart(challengeName);
      },
      error: () => {
        this.stats = null;
        console.error('Challenge introuvable ou erreur backend.');
      }
    });
  }
}

loadRevenuChefRegionChart(challengeName: string) {
  this.dashboardService.getRevenuChefRegionByName(challengeName).subscribe(data => {
    console.log("Données reçues :", data);

    const labels = Object.keys(data);
    const valeurs = Object.values(data);

    if (this.revenuChefRegionChart) {
      this.revenuChefRegionChart.destroy();
    }

    const canvas = document.getElementById('bar-chart-grouped') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    this.revenuChefRegionChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Revenu Total',
          data: valeurs,
          backgroundColor: 'rgba(54, 162, 235, 1.6)'
        }]
      },
      options: {
         responsive: false,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Revenu Chef Région' }
        }
      }
    });
  });
}

challengesEnCours: any[] = [];

getChallengesEnCours() {
  this.dashboardService.getChallengesEnCours().subscribe({
    next: (data: any) => {
      this.challengesEnCours = data;
    },
    error: () => {
      this.challengesEnCours = [];
    }
  });
}


/*** challenge encours 
  // ✅ Labels sur l'axe X (noms des challenges)
  barChartLabels: string[] = [];

  // ✅ Données du graphique (revenu total)
  barChartData: { data: any[]; label: string; backgroundColor: string }[] = [
    {
      data: [],
      label: 'Revenu Total (TND)',
      backgroundColor: '#66ccff'
    }
  ];

  // ✅ Type de graphique
  barChartType: ChartType = 'bar';

  // ✅ Options générales
  barChartOptions: ChartOptions = {
     responsive: false,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    }
  };

  
loadRevenuParChallenge() {
    this.dashboardService.getRevenuParChallenge().subscribe({
      next: (res: any[]) => {
        this.barChartLabels = res.map(item => item.challengeName);
        this.barChartData[0].data = res.map(item => item.revenuTotal || 0);
      },
      error: err => {
        console.error('Erreur chargement statistiques :', err);
      }
    });
  }
  ****** */
  revenuParChallengeChart: Chart | undefined;

loadRevenuParChallengeChart() {
  this.dashboardService.getRevenuParChallenge().subscribe(data => {
    console.log("Données des challenges :", data);

    const labels = data.map(item => item.challengeName);
    const valeurs = data.map(item => item.revenuTotal);

    if (this.revenuParChallengeChart) {
      this.revenuParChallengeChart.destroy();
    }

    const canvas = document.getElementById('bar-challenge-chart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    this.revenuParChallengeChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Revenu Total',
          data: valeurs,
          backgroundColor: 'rgba(54, 162, 235, 1.6)'
        }]
      },
      options: {
        responsive: false, 
         maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Revenu par Challenge en Cours' }
        }
      }
    });
  });
}
}