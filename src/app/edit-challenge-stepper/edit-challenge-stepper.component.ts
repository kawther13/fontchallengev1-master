import { Component, Inject } from '@angular/core';
import { ChallengeService } from '../service/challenge.service';
import { Challenge } from '../models/challenge';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConditionGainComponent } from '../condition-gain/condition-gain.component';
import { ScoreRuleComponent } from '../score/score-rule/score-rule.component';
import { RolePalierComponent } from '../role-palier/role-palier.component';
import { ConditionComponent } from '../condition/condition.component';
import { EditComponent } from '../challengee/edit/edit.component';

@Component({
  selector: 'app-edit-challenge-stepper',
  standalone: true,
  imports: [MatButtonModule,
      MatStepperModule,
      FormsModule,CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,ConditionGainComponent,ScoreRuleComponent,RolePalierComponent,ConditionComponent,EditComponent],
  templateUrl: './edit-challenge-stepper.component.html',
  styleUrl: './edit-challenge-stepper.component.css'
})
export class EditChallengeStepperComponent {

isLinear = true;
  stepperVisible = true;
  challengeId: number | null = null;

  constructor(
    private challengeService: ChallengeService,
    private dialogRef: MatDialogRef<EditChallengeStepperComponent>,
    @Inject(MAT_DIALOG_DATA) public challenge: Challenge
  ) {}

  ngOnInit(): void {
    this.challengeId = this.challenge.id!;
    this.challengeService.setChallengeId(this.challengeId);
  }

  finishStepper() {
    this.stepperVisible = false;
  }

  restart() {
    this.stepperVisible = true;
    // Ne pas réinitialiser l’ID dans édition
  }

  annuler(): void {
    this.dialogRef.close();
  }
}
