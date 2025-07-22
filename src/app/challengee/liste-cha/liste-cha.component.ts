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
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AddChallengeeComponent } from '../add-challengee/add-challengee.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddChallengeStepperComponent } from '../../add-challenge-stepper/add-challenge-stepper.component';
import { EditChallengeStepperComponent } from '../../edit-challenge-stepper/edit-challenge-stepper.component';
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
    MatSelectModule,RouterLink ,MatTableModule,
    MatPaginatorModule ,MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule, MatDialogModule],
  templateUrl: './liste-cha.component.html',
  styleUrl: './liste-cha.component.css'
})
export class ListeChaComponent {

displayedColumns: string[] = ['name', 'dateDebut', 'dateFin', 'description', 'etat', 'actions'];
  dataSource = new MatTableDataSource<Challenge>();
totalItems = 0;
  pageSize = 5;
  pageIndex = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private challengeService: ChallengeService,private router: Router,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadChallenges();
  }

   loadChallenges(): void {
    this.challengeService.getChallenges(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSource.data = data.content; // uniquement les données paginées
      this.totalItems = data.totalElements; // pour le paginator
    });
  }

 onPageChange(event: any): void {
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
  this.loadChallenges();
}

  /*ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // ✅ on connecte le paginator
  }*/

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
  this.router.navigate(['/home/edit', challenge.id]);
}

  deleteChallenge(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.challengeService.delete(id).subscribe(() => {
        alert('Challenge supprimé');
        this.loadChallenges();
      });
    }
  }

   
  openDialog(): void {
    const dialogRef = this.dialog.open(AddChallengeStepperComponent, {
      width: '1000px', // ✅ augmente à 1000px ou plus selon ton besoin
    maxWidth: '95vw', // ✅ important pour les écrans plus petits
    disableClose: true,
    panelClass: 'stepper-dialog-panel'
    });

   
  }

  openEditDialog(challenge: Challenge): void {
  const dialogRef = this.dialog.open(EditChallengeStepperComponent, {
    width: '1000px',
    maxWidth: '95vw',
    disableClose: true,
    data: challenge, // <-- envoie challenge à la modale
    panelClass: 'stepper-dialog-panel'
  });

  dialogRef.afterClosed().subscribe(result => {
    // facultatif : rafraîchir la liste après édition
    this.loadChallenges();
  });
}

}
