import { Component } from '@angular/core';

@Component({
  selector: 'app-dashagent',
  standalone: true,
  imports: [],
  templateUrl: './dashagent.component.html',
  styleUrl: './dashagent.component.css'
})
export class DashagentComponent {
/* 
challengeId: number = 20;
  challengeName: string = '';
  gainAgents: any[] = [];
  top3: any[] = [];

  nbAgents = 0;
  nbContrats = 0;
  totalRevenue = 0;

  chartLabels: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Today'];
  chartData = [
    { data: [12000, 15000, 4000, 0, 10000, 11260], label: 'Revenue (TND)' }
  ];
  chartOptions = {
    responsive: true,
  };

  displayedColumns: string[] = ['rank', 'nom', 'status', 'role', 'codePar', 'agence', 'level', 'totalPrime'];

  constructor(private gainService: GainAgentService) {}

  loadData() {
    this.gainService.getByChallenge(this.challengeId).subscribe(data => {
      this.gainAgents = data;

      this.nbAgents = [...new Set(data.map(d => d.codePar))].length;
      this.nbContrats = data.reduce((acc, curr) => acc + curr.nombreContrats, 0);
      this.totalRevenue = data.reduce((acc, curr) => acc + curr.totalPrime, 0);

      this.top3 = [...data]
        .sort((a, b) => b.totalPrime - a.totalPrime)
        .slice(0, 3);
    });
  }*/
}
