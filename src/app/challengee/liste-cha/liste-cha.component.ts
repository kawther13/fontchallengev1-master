import { Component, ViewChild } from '@angular/core';
import { Challenge } from '../../models/challenge';
import { ChallengeService } from '../../service/challenge.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-liste-cha',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,MatFormFieldModule,
         MatFormFieldModule,
        MatInputModule,
  
        MatSelectModule,
        MatButtonModule,
      MatPaginatorModule,
      FormsModule,
      ReactiveFormsModule,
      // autres modules Angular Material
      MatCardModule, // autres modules
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,RouterLink  ],
  templateUrl: './liste-cha.component.html',
  styleUrl: './liste-cha.component.css'
})
export class ListeChaComponent {

displayedColumns: string[] = ['name', 'dateDebut', 'dateFin', 'description', 'etat', 'actions'];
  dataSource = new MatTableDataSource<Challenge>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private challengeService: ChallengeService,private router: Router) {}

  ngOnInit(): void {
    this.loadChallenges();
  }

  loadChallenges(): void {
    this.challengeService.getAll().subscribe((data: any) => {
      this.dataSource.data = data; // ✅ on alimente le MatTableDataSource
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // ✅ on connecte le paginator
  }

  getEtat(challenge: Challenge): string {
    const today = new Date();
    const debut = new Date(challenge.dateDebut);
    const fin = new Date(challenge.dateFin);

    if (today < debut) {
      return 'À venir';
    } else if (today >= debut && today <= fin) {
      return 'En cours';
    } else {
      return 'Clôturé';
    }
  }

  getEtatColor(etat: string): string {
    switch (etat) {
      case 'En cours':
        return 'green';
      case 'À venir':
        return 'orange';
      case 'Clôturé':
        return 'red';
      default:
        return 'black';
    }
  }

  viewChallenge(challenge: Challenge): void {
 this.router.navigate(['/home/view', challenge.id]);
}

  editChallenge(challenge: Challenge): void {
    alert(`Édition du challenge : ${challenge.name}`);
  }

  deleteChallenge(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.challengeService.delete(id).subscribe(() => {
        alert('Challenge supprimé');
        this.loadChallenges();
      });
    }
  }
}
