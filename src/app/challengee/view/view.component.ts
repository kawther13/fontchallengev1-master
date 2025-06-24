import { Component } from '@angular/core';
import { ChallengeDetail } from '../../models/challenge-detail';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChallengeService } from '../../service/challenge.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule,MatCardModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
  MatTableModule,MatCardModule,MatDividerModule,
  MatCardModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatListModule,
    MatExpansionModule,
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {

  

 challenge: ChallengeDetail = {
  id: 0,
  name: '',
  dateDebut: '',
  dateFin: '',
  description: '',
  scorerule: [],
  concerners: [],
  condition: [],
  conditionGains: [],
  rolePaliers: []
};


  constructor(
    private route: ActivatedRoute,
    private challengeService: ChallengeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log(id)
  this.challengeService.getById(id).subscribe((data: any) => {
  this.challenge = {
    id: data.id,
    name: data.name,
    dateDebut: data.dateDebut,
    dateFin: data.dateFin,
    description: data.description,
    scorerule: data.scorerule || [],
    concerners: data.concerners || [],
    condition: data.condition || [],
    conditionGains: data.conditionGains || [],
    rolePaliers: data.rolePaliers || []
  };
  console.log(this.challenge);
});

  }

}
