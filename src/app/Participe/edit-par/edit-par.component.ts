import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantService } from '../../service/participant.service';
import { RegionService } from '../../service/region.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-par',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,
     
      MatFormFieldModule,
      MatInputModule,
      MatCardModule,
      MatSelectModule,
      MatButtonModule],
  templateUrl: './edit-par.component.html',
  styleUrl: './edit-par.component.css'
})
export class EditParComponent {

participantForm!: FormGroup;
  participantId!: number;
  message = '';
  regions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private participantService: ParticipantService,
    private regionService: RegionService
  ) {}

  ngOnInit(): void {
    this.participantId = +this.route.snapshot.paramMap.get('id')!;
    
    this.participantForm = this.fb.group({
      codePar: ['', Validators.required],
      matricule: [''],
      role: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required],
      agence: ['', Validators.required],
      regionId: ['', Validators.required]
    });

    this.loadRegions();
    this.loadParticipant();
    this.setupRoleChangeValidation();
  }

  loadRegions() {
    this.regionService.getRegions().subscribe(data => {
      this.regions = data;
    });
  }

  loadParticipant() {
    this.participantService.getParticipantById(this.participantId).subscribe(p => {
      this.participantForm.patchValue({
        codePar: p.codePar,
        matricule: p.matricule,
        role: p.role,
        nom: p.nom,
        email: p.email,
        motDePasse: p.motDePasse,
        agence: p.agence,
        regionId: p.region?.id
      });
    });
  }

  setupRoleChangeValidation() {
    this.participantForm.get('role')?.valueChanges.subscribe(role => {
      const matriculeControl = this.participantForm.get('matricule');
      if (role === 'AGENT') {
        matriculeControl?.clearValidators();
        matriculeControl?.setValue('');
      } else {
        matriculeControl?.setValidators([Validators.required]);
      }
      matriculeControl?.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.participantForm.invalid) return;

    const formValue = this.participantForm.value;
    const updatedParticipant = {
      codePar: formValue.codePar,
      matricule: formValue.role === 'AGENT' ? null : formValue.matricule,
      role: formValue.role,
      nom: formValue.nom,
      email: formValue.email,
      motDePasse: formValue.motDePasse,
      agence: formValue.agence,
      region: { id: formValue.regionId }
    };

    this.participantService.updateParticipant(this.participantId, updatedParticipant).subscribe({
      next: () => {
        this.message = '✅ Participant modifié avec succès.';
        setTimeout(() => this.router.navigate(['/participants']), 1500);
      },
      error: err => {
        console.error(err);
        this.message = '❌ Erreur lors de la mise à jour.';
      }
    });
  }
}
