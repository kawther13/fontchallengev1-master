import { Component } from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChallengeService } from '../service/challenge.service';
import { AddChallengeeComponent } from '../challengee/add-challengee/add-challengee.component';
import { ConditionGainComponent } from '../condition-gain/condition-gain.component';
import { GainComponent } from '../gain/gain.component';
import { ScoreRuleComponent } from '../score/score-rule/score-rule.component';
import { RolePalierComponent } from '../role-palier/role-palier.component';
import { ConditionComponent } from '../condition/condition.component';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-challenge-stepper',
  standalone: true,
  imports: [MatButtonModule,
    MatStepperModule,
    FormsModule,CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,AddChallengeeComponent,ConditionGainComponent,ScoreRuleComponent,RolePalierComponent,ConditionComponent],
  templateUrl: './add-challenge-stepper.component.html',
  styleUrl: './add-challenge-stepper.component.css'
})
export class AddChallengeStepperComponent {
   isLinear = true;
  challengeId: number | null = null;
  stepperVisible = true;

  constructor(public challengeService: ChallengeService,private dialogRef: MatDialogRef<AddChallengeStepperComponent>) {}

  setChallengeId(id: number) {
    this.challengeId = id;
    this.challengeService.setChallengeId(id);
  }

  finishStepper() {
    this.stepperVisible = false;
  }

  restart() {
    this.stepperVisible = true;
    this.challengeId = null;
   
  }
  annuler(): void {
  this.dialogRef.close(); 
}

}