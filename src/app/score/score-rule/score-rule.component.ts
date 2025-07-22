import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ScoreRule1Service } from '../../service/score-rule1.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ChallengeService } from '../../service/challenge.service';

@Component({
  selector: 'app-score-rule',
  standalone: true,
  imports: [ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatTableModule,CommonModule,MatSelectModule, MatListModule,
    MatIconModule],
  templateUrl: './score-rule.component.html',
  styleUrl: './score-rule.component.css'
})
export class ScoreRuleComponent {
scoreForm: FormGroup | any;
selectedType: string | any;
isEditMode = false;
id: any;
//challengeId: number | any;
scoreRules: any[] = []; // ✅ Liste pour affichage
displayedColumns: string[] = ['typeScore', 'pack', 'revenu', 'typeContrat', 'point', 'actions'];
@Input() challengeId!: number;
constructor(
  private fb: FormBuilder,
  private scoreRuleService: ScoreRule1Service,
  private route: ActivatedRoute,
  private router: Router,
private challengeService: ChallengeService
) {}

ngOnInit() {
  // ✅ Récupérer le challengeId depuis l'URL
 //this.challengeId = this.challengeService.getChallengeId();
console.log(this.challengeId)
  // ✅ Construire le FormGroup sans challengeId direct : on l'ajoutera dans la requête
  this.scoreForm = this.fb.group({
    typeScore: ['', Validators.required],
    pack: [''],
    revenu: [''],
    typeContrat: [''],
    point: ['', Validators.required]
  });

  // ✅ Si mode édition, charger la règle à modifier
  this.id = this.route.snapshot.params['scoreId']; // ⚠️ Vérifie bien que le paramètre est distinct de challengeId
  if (this.id) {
    this.isEditMode = true;
    this.loadScoreRule(this.id);
  }

  // ✅ Charger toutes les règles liées à ce challenge
  this.loadAllScoreRules();
}

loadScoreRule(id: number) {
  this.scoreRuleService.getById(id).subscribe(data => {
    this.scoreForm.patchValue(data);
    this.selectedType = data.typeScore;
  });
}

loadAllScoreRules() {
  this.scoreRuleService.getAllByChallenge(this.challengeId).subscribe((data: any[]) => {
    this.scoreRules = data;
  });
}

onTypeChange(value: string) {
  this.selectedType = value;
  this.scoreForm.patchValue({
    pack: '',
    revenu: '',
    typeContrat: ''
  });
}

onSubmit() {
  // ✅ Construire l'objet final : ajoute le Challenge correctement
  const scoreRule = {
    ...this.scoreForm.value,
    challenge: { id: this.challengeId }
  };
  console.log(this.challengeId)

  if (this.isEditMode) {
    this.scoreRuleService.update(this.id, scoreRule).subscribe(() => {
      alert('Mise à jour réussie !');
      this.loadAllScoreRules();
      this.router.navigate([`/challenge/${this.challengeId}`]);
    });
  } else {
    this.scoreRuleService.create(this.scoreForm.value, this.challengeId).subscribe(() => {
  alert('Ajout réussi !');
  this.loadAllScoreRules();
  this.scoreForm.reset();
  this.selectedType = null;
});
  }
}

deleteScore(id: number) {
  if (confirm('Confirmer la suppression ?')) {
    this.scoreRuleService.delete(id).subscribe(() => {
      alert('Supprimé !');
      this.loadAllScoreRules();
    });
  }
}

editScore(item: any) {
  this.isEditMode = true;
  this.id = item.id;
  this.scoreForm.patchValue(item);
  this.selectedType = item.typeScore;
}
}
