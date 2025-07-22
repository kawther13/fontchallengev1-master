import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Participant } from '../../models/participant';
import { ParticipantService } from '../../service/participant.service';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ParticipantComponent } from '../participant/participant.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-liste-participant',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatSortModule,MatCardModule, MatIconModule,CommonModule],
  templateUrl: './liste-participant.component.html',
  styleUrl: './liste-participant.component.css'
})
export class ListeParticipantComponent {
 
participants: Participant[] = [];

  // Pagination
  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
 

  constructor(private participantService: ParticipantService, private router: Router,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadParticipants();
  }

  loadParticipants(): void {
    this.participantService.getAllParticipants().subscribe({
      next: (data) => {
        this.participants = data;
        // Assure que la pagination est visible dès le chargement
        if (this.paginator) {
          this.paginator.firstPage();
        }
      },
      error: (err) => console.error('Erreur chargement participants :', err),
    });
  }

  // Affiche les données en fonction de la pagination
  paginatedData(): Participant[] {
    const start = this.pageIndex * this.pageSize;
    return this.participants.slice(start, start + this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  editParticipant(id: number): void {
    this.router.navigate(['home/editP', id]);
  }

  deleteParticipant(id: number): void {
    if (confirm('❗Voulez-vous vraiment supprimer ce participant ?')) {
      this.participantService.deleteParticipant(id).subscribe({
        next: () => this.loadParticipants(),
        error: (err) => {
          console.error(err);
          alert('❌ Erreur lors de la suppression.');
        }
      });
    }
  }

   openDialog(): void {
      const dialogRef = this.dialog.open(ParticipantComponent, {
        width: '800px', // ✅ augmente à 1000px ou plus selon ton besoin
      maxWidth: '95vw', // ✅ important pour les écrans plus petits
      disableClose: true,
      panelClass: 'stepper-dialog-panel'
      });
  
     
    }
 
}