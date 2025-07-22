import { Component } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashbord-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashbord-user.component.html',
  styleUrl: './dashbord-user.component.css'
})
export class DashbordUserComponent {
challengeStats: any[] = [];
  userId: number | undefined;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    // ✅ Récupérer le code utilisateur (codePar) depuis localStorage
    this.userId = Number(localStorage.getItem('userId') );

    if (this.userId) {
      this.dashboardService.getStatistiquesParChallenge(this.userId).subscribe(data => {
        this.challengeStats = data;
      });
    }
  }
}

