import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Agence } from '../models/agence';
import { Region } from '../models/region';
import { AgenceService } from '../service/agence.service';
import { RegionService } from '../service/region.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agence',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,CommonModule],
  templateUrl: './agence.component.html',
  styleUrl: './agence.component.css'
})
export class AgenceComponent {

 agenceForm: FormGroup;
  agences: Agence[] = [];
  regions: Region[] = [];
  selectedAgenceId: number | null = null;
  message: string = '';
  displayedColumns: string[] = [
    'id',
    'codeAgence',
    'mail',
    'typeAgence',
    'nom',
    'region',
    'actions'
  ];

  constructor(
    private fb: FormBuilder,
    private agenceService: AgenceService,
    private regionService: RegionService
  ) {
    this.agenceForm = this.fb.group({
      codeAgence: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      typeAgence: ['', Validators.required],
      nom: ['', Validators.required],
      regionId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAgences();
    this.loadRegions();
    console.log('✔ Liste des regions :');
  }

  loadAgences(): void {
    this.agenceService.getAllAgences().subscribe({
      next: (data) => {
        this.agences = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des agences :', err);
      }
    });
  }

 loadRegions(): void {
  this.regionService.getAllRegions().subscribe({
    next: (data) => {
      console.log('✔ Liste des regions :', data);
      this.regions = data;
    },
    error: (err) => {
      console.error('❌ Erreur API regions :', err);
    }
  });
}


 onSubmit(): void {
  if (this.agenceForm.invalid) {
    this.message = 'Veuillez remplir tous les champs.';
    return;
  }

  const regionId = this.agenceForm.value.regionId;

  const agencePayload: any = {
    codeAgence: this.agenceForm.value.codeAgence,
    mail: this.agenceForm.value.mail,
    typeAgence: this.agenceForm.value.typeAgence,
    nom: this.agenceForm.value.nom
    // PAS DE region ici !
  };

  if (this.selectedAgenceId) {
    this.agenceService.updateAgence(this.selectedAgenceId, regionId, agencePayload).subscribe({
      next: () => {
        this.message = 'Agence mise à jour.';
        this.resetForm();
        this.loadAgences();
      },
      error: (error) => {
        console.error(error);
        this.message = error.error?.message || 'Erreur lors de la mise à jour.';
      }
    });
  } else {
    this.agenceService.createAgence(regionId, agencePayload).subscribe({
      next: () => {
        this.message = 'Agence ajoutée.';
        this.resetForm();
        this.loadAgences();
      },
      error: (error) => {
        console.error(error);
        this.message = error.error?.message || 'Erreur lors de l\'ajout.';
      }
    });
  }
}


  editAgence(agence: Agence): void {
    this.agenceForm.patchValue({
      codeAgence: agence.codeAgence,
      mail: agence.mail,
      typeAgence: agence.typeAgence,
      nom: agence.nom,
      regionId: agence.region?.id || null
    });
    this.selectedAgenceId = agence.id ?? null;
    this.message = '';
  }

  deleteAgence(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette agence ?')) {
      this.agenceService.deleteAgence(id).subscribe({
        next: () => {
          this.message = 'Agence supprimée avec succès.';
          this.loadAgences();
        },
        error: (error) => {
          console.error(error);
          this.message = 'Erreur lors de la suppression.';
        }
      });
    }
  }

  resetForm(): void {
    this.agenceForm.reset();
    this.selectedAgenceId = null;
    this.message = '';
  }

}