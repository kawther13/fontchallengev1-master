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
import { TypeScore } from '../../models/TypeScore';
import { TypeScoreService } from '../../service/type-score.service';
import { TypeContratService } from '../../service/type-contrat.service';
import { TypeContrat } from '../../models/TypeContrat';
import { Pack } from '../../models/pack';
import { PackService } from '../../service/pack.service';

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
  packs: Pack[] = [];

scoreForm: FormGroup | any;
selectedType: string | any;
isEditMode = false;
id: any;
typeScores: TypeScore[] = [];
//challengeId: number | any;
scoreRules: any[] = []; // ✅ Liste pour affichage
displayedColumns: string[] = ['typeScore', 'pack', 'revenu', 'typeContrat', 'point', 'actions'];
@Input() challengeId!: number;
availableTypeContrats: TypeContrat[] = [];
constructor(
  private fb: FormBuilder,
  private scoreRuleService: ScoreRule1Service,
  private route: ActivatedRoute,
  private router: Router,
private challengeService: ChallengeService,
private typeScoreService :TypeScoreService,
 private typeContratService: TypeContratService,
 private packService :PackService
) {}

ngOnInit() {
  // ✅ Récupérer le challengeId depuis l'URL
 //this.challengeId = this.challengeService.getChallengeId();
console.log(this.challengeId)
  // ✅ Construire le FormGroup sans challengeId direct : on l'ajoutera dans la requête
  this.scoreForm = this.fb.group({
    typeScore: [null, Validators.required], // on va stocker l'objet TypeScore
    pack: [''],
    revenu: [''],
    typeContrat: [''],
    point: ['', Validators.required]
  });

  // ✅ Si mode édition, charger la règle à modifier
  /*this.id = this.route.snapshot.params['scoreId']; // ⚠️ Vérifie bien que le paramètre est distinct de challengeId
  if (this.id) {
    this.isEditMode = true;
    this.loadScoreRule(this.id);
  }*/

  // ✅ Charger toutes les règles liées à ce challenge
  this.loadAllScoreRules();
  this.typeScoreService.getAll().subscribe(data => {
    this.typeScores = data;
  });
  this.loadTypeContrats();
  this.loadPacks();
}
loadPacks(): void {
  this.packService.getAllPacks().subscribe(data => {
    this.packs = data;
  });
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
 loadTypeContrats() {
    this.typeContratService.getAll().subscribe(data => {
      this.availableTypeContrats = data;
    });
  }

onTypeChange(value: TypeScore) {
  this.selectedType = value?.libelle?.toLowerCase(); // assure que 'PACK' → 'pack'

  this.scoreForm.patchValue({
    pack: null,
    revenu: null,
    typeContrat: null
  });
}



onSubmit() {
  const formValue = this.scoreForm.value;

  const scoreRule = {
    typeScore: { id: formValue.typeScore.id },
    challenge: { id: this.challengeId },
    point: formValue.point,
    revenu: formValue.revenu || null,
    pack: formValue.pack ? { id: formValue.pack } : null,
    typeContrat: formValue.typeContrat ? { id: formValue.typeContrat } : null
  };

  if (this.isEditMode) {
    this.scoreRuleService.update(this.id, scoreRule).subscribe(() => {
      alert('Mise à jour réussie !');
      this.loadAllScoreRules();
      this.scoreForm.reset();
      this.selectedType = null;
      this.isEditMode = false;
      this.id = null;
      this.router.navigate([`/challenge/${this.challengeId}`]);
    });
  } else {
    this.scoreRuleService.create(scoreRule, this.challengeId).subscribe(() => {
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

  const selectedTypeScore = this.typeScores.find(t => t.id === item.typeScore.id);

  this.scoreForm.patchValue({
    typeScore: selectedTypeScore,
    pack: item.pack?.id || null,
    revenu: item.revenu || null,
    typeContrat: item.typeContrat?.id || null,
    point: item.point
  });

  this.selectedType = selectedTypeScore?.libelle?.toLowerCase();
}

}
