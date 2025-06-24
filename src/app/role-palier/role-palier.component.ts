import { Component } from '@angular/core';

import { RolePalierService } from '../service/role-palier.service';
import { PalierClassementService } from '../service/palier-classement.service';
import { PalierIntervalleService } from '../service/palier-intervalle.service';
import { ChallengeService } from '../service/challenge.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommissionService } from '../service/commission.service';
import { PalierCommission } from '../models/palier-commission';
import { RolePaliers } from '../models/role-paliers';
import { PalierClassement } from '../models/palier-classement';
import { PalierIntervalle } from '../models/palier-intervalle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-role-palier',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule
      ,MatFormFieldModule,
           MatFormFieldModule,
          MatInputModule,
          MatSelectModule,
          MatButtonModule,
          MatListModule,
          MatListModule,
           MatTableModule, MatIconModule],
  templateUrl: './role-palier.component.html',
  styleUrl: './role-palier.component.css'
})
export class RolePalierComponent {

challengeId: number | null = null;

  rolePalier: RolePaliers = {
    role: '',
    typeGain: '',
    palierClassements: [],
    palierIntervalles: [],
    commissions: []
  };

  rolePalierId: number | null = null;

  rolePaliersList: RolePaliers[] = [];
  displayedColumns: string[] = ['role', 'typeGain', 'actions'];

  constructor(
    private rolePalierService: RolePalierService,
    private palierClassementService: PalierClassementService,
    private palierIntervalleService: PalierIntervalleService,
    private commissionService: CommissionService,
    private challengeService: ChallengeService
  ) {}

  ngOnInit(): void {
    this.challengeId = this.challengeService.getChallengeId();
    this.loadRolePaliers();
  }

  loadRolePaliers(): void {
    if (!this.challengeId) return;
    this.rolePalierService.getByChallenge(this.challengeId).subscribe(data => {
      this.rolePaliersList = data;
    });
  }

  saveRolePalier(): void {
    if (!this.challengeId) return;
    this.rolePalierService.addRolePalier(this.challengeId, this.rolePalier).subscribe(saved => {
      this.rolePalierId = saved.id!;
      alert('Rôle enregistré ! Ajoutez les données associées');
      this.loadRolePaliers();
    });
  }

  savePaliers(): void {
    if (!this.rolePalierId) return;

    if (this.rolePalier.typeGain === 'classement') {
      this.rolePalier.palierClassements.forEach(p => {
        this.palierClassementService.add(this.rolePalierId!, p).subscribe();
      });
    } else if (this.rolePalier.typeGain === 'palier') {
      this.rolePalier.palierIntervalles.forEach(p => {
        this.palierIntervalleService.add(this.rolePalierId!, p).subscribe();
      });
    } else if (this.rolePalier.typeGain === 'commission') {
      this.rolePalier.commissions.forEach(c => {
        this.commissionService.add(this.rolePalierId!, c).subscribe();
      });
    }

    alert('Enregistré avec succès');
    this.reset();
    this.loadRolePaliers();
  }

  addClassement() {
    this.rolePalier.palierClassements.push({ nbr: 0, montant: 0 });
  }

  addIntervalle() {
    this.rolePalier.palierIntervalles.push({ min: 0, max: 0, montant: 0 });
  }

  addCommission() {
    this.rolePalier.commissions.push({ min: 0, max: 0, pourcentage: 0 });
  }

  removeClassement(i: number) {
    this.rolePalier.palierClassements.splice(i, 1);
  }

  removeIntervalle(i: number) {
    this.rolePalier.palierIntervalles.splice(i, 1);
  }

  removeCommission(i: number) {
    this.rolePalier.commissions.splice(i, 1);
  }

  deleteRolePalier(id: number) {
    if (confirm('Supprimer ce rôle et ses données ?')) {
      this.rolePalierService.deleteRolePalier(id).subscribe(() => {
        alert('Rôle supprimé');
        this.loadRolePaliers();
        this.reset();
      });
    }
  }

  editRolePalier(r: RolePaliers) {
    this.rolePalier = { ...r };
    this.rolePalierId = r.id!;

    // Recharge ses sous-listes du backend
    if (r.typeGain === 'classement') {
      this.palierClassementService.getByRolePalier(r.id!).subscribe(data => this.rolePalier.palierClassements = data);
    } else if (r.typeGain === 'palier') {
      this.palierIntervalleService.getByRolePalier(r.id!).subscribe(data => this.rolePalier.palierIntervalles = data);
    } else if (r.typeGain === 'commission') {
      this.commissionService.getByRolePalier(r.id!).subscribe(data => this.rolePalier.commissions = data);
    }
  }

  reset() {
    this.rolePalier = {
      role: '',
      typeGain: '',
      palierClassements: [],
      palierIntervalles: [],
      commissions: []
    };
    this.rolePalierId = null;
  }

}