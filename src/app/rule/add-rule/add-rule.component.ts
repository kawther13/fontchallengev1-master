import { Component } from '@angular/core';
import { ChallengeService } from '../../service/challenge.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RuleService } from '../../service/rule.service';

@Component({
  selector: 'app-add-rule',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-rule.component.html',
  styleUrl: './add-rule.component.css'
})
export class AddRuleComponent {

 rule = { contractType: '', transactionNature: '', packType: '' };
  rules: any[] = [];
  challengeId: number | null = null;
  editingRuleId: number | null = null;

  constructor(
    private ruleService: RuleService,
    private challengeService: ChallengeService
  ) {}

  ngOnInit(): void {
    this.challengeId = this.challengeService.getChallengeId();
    if (this.challengeId) {
      this.loadRules();
    }
  }

 loadRules(): void {
  if (this.challengeId) {
    this.ruleService.getRulesByChallenge(this.challengeId).subscribe(data => {
      this.rules = [...data];
    });
  }
}
 addOrUpdateRule(): void {
  if (!this.challengeId) return;

  if (this.editingRuleId) {
    // Copie SANS l’id
    const updatedRule = {
      contractType: this.rule.contractType,
      transactionNature: this.rule.transactionNature,
      packType: this.rule.packType
    };

    this.ruleService.updateRule(this.editingRuleId, updatedRule).subscribe(() => {
      this.resetForm();
      this.loadRules();
      alert('Rule mise à jour !');
    });
  } else {
    this.ruleService.addRule(this.challengeId, this.rule).subscribe(() => {
      this.resetForm();
      this.loadRules();
      alert('Rule ajoutée !');
    });
  }
}


  editRule(rule: any): void {
    this.rule = { ...rule };
    this.editingRuleId = rule.id;
  }

deleteRule(id: number): void {
  this.ruleService.deleteRule(id).subscribe({
    next: () => {
      this.loadRules(); // recharge les données depuis le backend
      alert('Rule supprimée');
    },
    error: err => {
      console.error("Erreur suppression", err);
      alert('Erreur lors de la suppression');
    }
  });
}



  resetForm(): void {
    this.rule = { contractType: '', transactionNature: '', packType: '' };
    this.editingRuleId = null;
  }
}