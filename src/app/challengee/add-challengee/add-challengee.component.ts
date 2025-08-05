import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule,AbstractControl, Validators ,FormControl,ValidationErrors} from '@angular/forms';
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
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';

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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,],
  templateUrl: './add-challengee.component.html',
  styleUrl: './add-challengee.component.css'
})
export class AddChallengeeComponent {
today: Date = new Date();
 challengeForm!: FormGroup;
  availableConcerners: Concerner[] = [];   // ✅ Typé
@Output() challengeCreated = new EventEmitter<number>();
  constructor(
    private fb: FormBuilder,
    private challengeService: ChallengeService,
    private concernerService: ConcernerService,
    private router: Router,
     private dialogRef: MatDialogRef<AddChallengeeComponent>
  ) {
    let controls={ 
      name: new FormControl('',[
Validators.required,
Validators.minLength(3),
Validators.maxLength(10),

Validators.pattern('^[A-Z][a-z]*$')

  ] ),
  dateDebut: new FormControl('',[
Validators.required,

  ] ), 
dateFin:new FormControl('',[
Validators.required] ), 
description:new FormControl('',[
Validators.required] ),
concerners:new FormControl('',[
Validators.required] )
}  

this.challengeForm = this.fb.group(controls, { validators: this.dateRangeValidator });
  }

  ngOnInit(): void {
  

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
         this.challengeCreated.emit(response.id);
       //this.router.navigate(['home/add', response.id]);
 // ✅ Utilise 'this.router'
      },
      error: (err) => {
        console.error(err);
        alert("Erreur lors de l'enregistrement !");
      }
    });
  }
}

onCancel(): void {
  this.dialogRef.close(); // Ferme simplement le dialog sans retourner de données
}


dateRangeValidator(control: AbstractControl): ValidationErrors | null {
  const startDate = control.get('dateDebut')?.value;
  const endDate = control.get('dateFin')?.value;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Réinitialiser l'heure pour comparaison

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Vérifier si la date de début est inférieure à la date de fin
    if (start >= end) {
      return { invalidRange: 'La date de début doit être inférieur à la date de fin' };
    }

     

    // Vérifier si la date de fin est supérieure ou égale à aujourd'hui
    if (end < today) {
      return { invalidEndDate: 'La date de fin doit être aujourd\'hui ou dans le futur' };
    }
  }
  return null;
}
}