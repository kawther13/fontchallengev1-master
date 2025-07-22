import { Component, ViewChild } from '@angular/core';
import { GainService } from '../service/gain.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-gain',
  standalone: true,
  imports: [FormsModule,CommonModule, MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCardModule,MatIconModule],
  templateUrl: './gain.component.html',
  styleUrl: './gain.component.css'
})
export class GainComponent {

 challengeName = '';
  selectedRole = '';
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['nom', 'codePar', 'email', 'agence', 'region', 'nombreContrats', 'totalPrime', 'score', 'rang', 'gain'];
  loading = false;
  errorMessage = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private gainService: GainService) {}

  rechercherGain(): void {
    this.loading = true;
    this.errorMessage = '';
    this.dataSource.data = [];

    const serviceMap: any = {
      'AGENT': this.gainService.getGainsAgents.bind(this.gainService),
      'SALARIE': this.gainService.getGainsSalaries.bind(this.gainService),
      'CHEF_AGENCE': this.gainService.getGainsChefsAgence.bind(this.gainService),
      'CHEF_REGION': this.gainService.getGainsChefsRegion.bind(this.gainService),
    };

    const selectedService = serviceMap[this.selectedRole];
    if (!selectedService) {
      this.errorMessage = '❌ Rôle non reconnu';
      this.loading = false;
      return;
    }

    selectedService(this.challengeName).subscribe({
      next: (data:any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = '⚠️ Erreur lors du chargement des données.';
        this.loading = false;
      }
    });
  }
}