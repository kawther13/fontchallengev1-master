import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProduitService } from '../../service/produit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-produit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,MatFormFieldModule,
       MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatButtonModule],
  templateUrl: './edit-produit.component.html',
  styleUrl: './edit-produit.component.css'
})
export class EditProduitComponent {

produitForm: FormGroup;
  allPacks: any[] = [];
  message = '';
  produitId!: number;

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.produitForm = this.fb.group({
      name: ['', Validators.required],
      packs: [[]]
    });
  }

  ngOnInit(): void {
    
    this.produitService.getAllPacks().subscribe(data => {
      this.allPacks = data;
      console.log(data)
    });

  
    this.produitId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.produitId) {
      this.produitService.getProduitById(this.produitId).subscribe(produit => {
        this.produitForm.patchValue({
          name: produit.name,
          packs: produit.packs.map((p: any) => p.id)
        });
      });
    }
  }

  onSubmit(): void {
    const produitData = {
      name: this.produitForm.value.name,
      packIds: this.produitForm.value.packs
    };

    this.produitService.updateProduit(this.produitId, produitData).subscribe(() => {
      this.message = 'Produit mis à jour avec succès !';
      this.router.navigate(['home/listP']); 
    });
  }
}
