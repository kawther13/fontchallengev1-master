import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ParticipantService } from '../../service/participant.service';
import { Participant } from '../../models/participant';
import { CommonModule } from '@angular/common';
import { RegionService } from '../../service/region.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-participant',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,
   
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './participant.component.html',
  styleUrl: './participant.component.css'
})
export class ParticipantComponent {

participantForm: FormGroup;
  message: string = '';
  regions: any[] = [];

  constructor(private fb: FormBuilder, private participantService: ParticipantService, private regionService :RegionService,private dialogRef: MatDialogRef<ParticipantComponent>) {
    this.participantForm = this.fb.group({
      codePar: ['', Validators.required],
      matricule: ['', Validators.required],
      role: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required],
      agence: ['', Validators.required],
      regionId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.regionService.getRegions().subscribe(data => {
      this.regions = data;
    });

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
    const participant = {
      id: null,
      codePar: formValue.codePar,
      matricule: formValue.role === 'AGENT' ? null : formValue.matricule,
      role: formValue.role,
      nom: formValue.nom,
      email: formValue.email,
      motDePasse: formValue.motDePasse,
      agence: formValue.agence,
      region: { id: formValue.regionId }
    };

    this.participantService.ajouterParticipant(participant).subscribe({
      next: () => {
        this.message = '✅ Participant ajouté avec succès. Vérifiez votre email.';
        this.participantForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.message = '❌ Erreur lors de l\'ajout.';
      }
    });
  }
      annuler(): void {
  this.dialogRef.close(); 
}
}