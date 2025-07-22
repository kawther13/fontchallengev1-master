import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeService } from '../../service/challenge.service';
import { Challenge } from '../../models/challenge';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,MatFormFieldModule,
         MatFormFieldModule,
        MatInputModule,
  
        MatSelectModule,
        MatButtonModule,
     
      FormsModule,
      ReactiveFormsModule,
      // autres modules Angular Material
      MatCardModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
 @Input() challenge!: Challenge;
  @Output() challengeUpdated = new EventEmitter<void>();

  challengeForm!: FormGroup;
  availableConcerners: any[] = [];

  constructor(private fb: FormBuilder, private challengeService: ChallengeService) {}

  ngOnInit(): void {
    this.challengeForm = this.fb.group({
      name: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      description: [''],
      concerners: [[], Validators.required]
    });

    this.loadConcerners();
  }

  loadConcerners(): void {
    this.challengeService.getAllConcerners(this.challenge.id!).subscribe(data => {
      this.availableConcerners = data;

      const selectedConcernerIds = this.challenge.concerners.map((c: any) => c.id);

      this.challengeForm.patchValue({
        name: this.challenge.name,
        dateDebut: this.challenge.dateDebut,
        dateFin: this.challenge.dateFin,
        description: this.challenge.description,
        concerners: selectedConcernerIds
      });
    });
  }

  updateChallenge(): void {
    const updatedChallenge: Challenge = {
      ...this.challengeForm.value,
      concerners: this.challengeForm.value.concerners.map((id: number) => ({ id }))
    };

    this.challengeService.update(this.challenge.id!, updatedChallenge).subscribe({
      next: () => {
        alert('✅ Challenge modifié avec succès !');
        this.challengeUpdated.emit();
      },
      error: (err) => {
        console.error(err);
        alert('❌ Erreur lors de la mise à jour.');
      }
    });
  }
}