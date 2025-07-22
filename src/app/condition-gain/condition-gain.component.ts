import { Component, Input } from '@angular/core';

import { ConditionGainService } from '../service/condition-gain.service';
import { ChallengeService } from '../service/challenge.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { ConditionGain } from '../models/condition-gain';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-condition-gain',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule,CommonModule,FormsModule
      ,MatFormFieldModule,
           MatFormFieldModule,
          MatInputModule,
          MatSelectModule,
          MatButtonModule,
          MatListModule,
          MatListModule,
           MatTableModule, MatIconModule],
  templateUrl: './condition-gain.component.html',
  styleUrl: './condition-gain.component.css'
})
export class ConditionGainComponent {
 conditionGainForm!: FormGroup;
  conditionGains: ConditionGain[] = [];
  editingId: number | null = null;
 // challengeId: number | null = null;

  roles = ['AGENT', 'SALARIE', 'CHEF_AGENCE', 'CHEF_REGION'];
  contratTypes = ['FORFAITAIRE', 'RENOUVELABLE','annuel'];
  displayedColumns: string[] = ['role', 'typeContrat', 'nbrContrat', 'prime', 'actions'];
@Input() challengeId!: number;
  constructor(
    private fb: FormBuilder,
    private conditionGainService: ConditionGainService,
    private challengeService: ChallengeService
  ) {}

  ngOnInit(): void {
   // this.challengeId = this.challengeService.getChallengeId();

    // ✅ Initialiser le formulaire réactif
    this.conditionGainForm = this.fb.group({
      role: ['', Validators.required],
      typeContrat: ['', Validators.required],
      nbrContrat: [0, [Validators.required, Validators.min(0)]],
      prime: [0, [Validators.required, Validators.min(0)]]
    });

    if (this.challengeId) {
      this.loadConditions();
    }
  }

  loadConditions(): void {
    this.conditionGainService.getByChallenge(this.challengeId!).subscribe((data: any) => {
      this.conditionGains = data;
    });
  }

  submit(): void {
    console.log(this.conditionGainForm.value);
    if (!this.challengeId) {
      alert('Challenge non défini.');
      return;
    }

    if (this.conditionGainForm.invalid) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const conditionData: ConditionGain = this.conditionGainForm.value;
    console.log(this.conditionGainForm.value);

    if (this.editingId) {
      this.conditionGainService.updateConditionGain(this.editingId, conditionData).subscribe(() => {
        alert('Condition modifiée');
        this.resetForm();
        this.loadConditions();
      });
    } else {
      this.conditionGainService.addConditionGain(this.challengeId, conditionData).subscribe(() => {
        alert('Condition ajoutée');
        this.resetForm();
        this.loadConditions();
      });
    }
  }

  edit(condition: ConditionGain): void {
    this.conditionGainForm.patchValue(condition);
    this.editingId = condition.id!;
  }

  delete(id: number): void {
    if (confirm('Supprimer cette condition ?')) {
      this.conditionGainService.deleteConditionGain(id).subscribe(() => {
        this.loadConditions();
      });
    }
  }

  resetForm(): void {
    this.conditionGainForm.reset({
      role: '',
      typeContrat: '',
      nbrContrat: 0,
      prime: 0
    });
    this.editingId = null;
  }

}