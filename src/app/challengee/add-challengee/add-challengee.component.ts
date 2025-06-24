import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Concerner } from '../../models/concerner';

import { ChallengeService } from '../../service/challenge.service';
import { ConcernerService } from '../../service/concerner.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Challenge } from '../../models/challenge';
@Component({
  selector: 'app-add-challengee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,MatFormFieldModule,
       MatFormFieldModule,
      MatInputModule,

      MatSelectModule,
      MatButtonModule,
   
    FormsModule,
    ReactiveFormsModule,
    // autres modules Angular Material
    MatCardModule,  
    ],
  templateUrl: './add-challengee.component.html',
  styleUrl: './add-challengee.component.css'
})
export class AddChallengeeComponent {

 challengeForm!: FormGroup;
  availableConcerners: Concerner[] = [];   // ✅ Typé

  constructor(
    private fb: FormBuilder,
    private challengeService: ChallengeService,
    private concernerService: ConcernerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.challengeForm = this.fb.group({
      name: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      description: [''],
      concerners: [[]]   // tableau d'IDs de Concerner
    });

    this.loadConcerners();
  }

  loadConcerners() {
    this.concernerService.getAll().subscribe(data => {
      this.availableConcerners = data;
      console.log(data)
    });
  }

 onSubmit() {
  console.log(this.challengeForm.value)
  if (this.challengeForm.valid) {
    const challenge: Challenge = {
      ...this.challengeForm.value,
      concerners: this.challengeForm.value.concerners.map((id: number) => ({ id }))
    };

    this.challengeService.save(challenge).subscribe({
      next: (response:any) => {  // ✅ Déclare 'response' ici
        
        alert("Challenge ajouté avec succès !");
        this.challengeForm.reset();
       this.router.navigate(['home/add', response.id]);
 // ✅ Utilise 'this.router'
      },
      error: (err) => {
        console.error(err);
        alert("Erreur lors de l'enregistrement !");
      }
    });
  }
}

}