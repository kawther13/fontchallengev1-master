import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pack } from '../../models/pack';
import { PackService } from '../../service/pack.service';
import { ProduitService } from '../../service/produit.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button'; // pour mat-raised-button
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-prod',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,MatFormFieldModule,
     MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './add-prod.component.html',
  styleUrl: './add-prod.component.css'
})
export class AddProdComponent {
produitForm: FormGroup;
  allPacks: Pack[] = [];
  message = '';

  constructor(
    private fb: FormBuilder,
    private packService: PackService,
    private produitService: ProduitService,
    private router : Router
  ) {
    this.produitForm = this.fb.group({
      name: ['', Validators.required],
      packs: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.packService.getAllPacks().subscribe({
      next: (data) => this.allPacks = data,
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    this.message = '';
    if (this.produitForm.valid) {
      const formValue = this.produitForm.value;
      const payload = {
        name: formValue.name,
        packs: formValue.packs.map((packId: number) => ({ id: packId }))
      };

      this.produitService.createProduit(payload).subscribe({
        next: () => {
          this.message = '✅ Produit créé avec succès !';
          this.produitForm.reset();
          this.router.navigate(['/home/listP']);
        },
        error: (err) => {
          console.error(err);
          this.message = '❌ Erreur lors de la création du produit.';
        }
      });
    } else {
      this.message = '⚠️ Remplir tous les champs.';
    }
  }
}
