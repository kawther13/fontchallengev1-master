import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConditionComponent } from "../../condition/condition.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChallengeService } from '../../service/challenge.service';
import { ConditionGainComponent } from "../../condition-gain/condition-gain.component";
import { ScoreRuleComponent } from "../../score/score-rule/score-rule.component";
import { RolePalierComponent } from "../../role-palier/role-palier.component";

@Component({
  selector: 'app-composant',
  standalone: true,
  imports: [ConditionComponent, CommonModule,
    FormsModule, ConditionGainComponent, ScoreRuleComponent, RolePalierComponent],
  templateUrl: './composant.component.html',
  styleUrl: './composant.component.css'
})
export class ComposantComponent {
@Input() challengeId!: any; 

  constructor(private route: ActivatedRoute, public challengeService :ChallengeService) {}
   ngOnInit(): void {
    this.challengeId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Challenge ID:', this.challengeId);
    this.challengeService.setChallengeId(this.challengeId);
  }

}
