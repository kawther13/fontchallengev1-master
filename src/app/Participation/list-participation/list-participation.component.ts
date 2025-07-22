import { Component } from '@angular/core';
import { ParticipationService } from '../../service/participation.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-list-participation',
  standalone: true,
  imports: [
    FormsModule,
    
   CommonModule,
    // ✅ Angular Material UI
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatTableModule,MatTableModule,
    MatCardModule,
    MatDividerModule,],
  templateUrl: './list-participation.component.html',
  styleUrl: './list-participation.component.css'
})
export class ListParticipationComponent {
columns: string[] = ['codeAgence', 'nom', 'typeAgence', 'email'];

challengeName: string = '';
selectedType: string = '';
agents: any[] = [];
commercants: any[] = [];
participantsParRegion: { [key: string]: any[] } = {};

constructor(private participationService: ParticipationService) {}

ngOnInit(): void {}

onAfficher() {
  if (!this.challengeName || !this.selectedType) return;

  if (this.selectedType === 'agents') {
    this.participationService.getAgents(this.challengeName).subscribe(data => this.agents = data);
  } else if (this.selectedType === 'commercants') {
    this.participationService.getCommercants(this.challengeName).subscribe(data => this.commercants = data);
  } else if (this.selectedType === 'regions') {
    this.participationService.getParRegion(this.challengeName).subscribe(data => this.participantsParRegion = data);
  }
}

// ✅ Compter les participants d’un type (AGENT ou COMMERCANT)
countType(participants: any[], type: string): number {
  return participants.filter(p => p.typeAgence === type).length;
}
}