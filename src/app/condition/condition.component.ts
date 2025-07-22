import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Produit } from '../models/produit';
import { Pack } from '../models/pack';
import { ConditionProduitPack } from '../models/condition-produit-pack';
import { ConditionService } from '../service/condition.service';
import { ProduitService } from '../service/produit.service';
import { Condition } from '../models/condition';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-condition',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule
    ,MatFormFieldModule,
         MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatListModule,
        MatListModule,
         MatTableModule, MatIconModule,MatCardModule
  ],
  templateUrl: './condition.component.html',
  styleUrl: './condition.component.css'
})
export class ConditionComponent {
displayedColumns: string[] = ['typeContrat', 'prime', 'packs', 'actions'];
contratTypes = ['FORFAITAIRE', 'RENOUVELABLE','annuel'];
 conditionForm: FormGroup;
  produits: any[] = [];

  selectedProduit!: any;
  selectedPacks: any[] = [];

  produitsAjoutes: any[] = [];
  packsAjoutes: any[] = [];
  //challengeId!: number;

  conditions: any[] = [];

  isEditMode = false;
  editingConditionId: number | null = null;
@Input() challengeId!: number;

  constructor(
    private fb: FormBuilder,
    private conditionService: ConditionService,
    private produitService: ProduitService,
    private route: ActivatedRoute
  ) {
    this.conditionForm = this.fb.group({
      typeContrat: [''],
      prime: [0],
      produit: [null],
      packs: [[]]
    });
  }

  ngOnInit(): void {
    this.loadProduits();
   // this.challengeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadConditions();
    if (!this.challengeId) {
    console.warn("challengeId non reçu depuis le parent !");
    return;
  }
  }

  loadProduits() {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
    });
  }

  loadConditions() {
    this.conditionService.getConditionsByChallenge(this.challengeId).subscribe(data => {
      this.conditions = data;
    });
  }

  onProduitChange(event: any) {
    this.selectedProduit = event.value;
    this.selectedPacks = [];
    this.conditionForm.get('packs')?.setValue([]);
  }

  addProduit() {
    if (this.selectedProduit && !this.produitsAjoutes.find(p => p.id === this.selectedProduit.id)) {
      this.produitsAjoutes.push(this.selectedProduit);
    }
    this.selectedProduit = undefined!;
    this.conditionForm.get('produit')?.setValue(null);
  }

  addPacks() {
    for (const pack of this.selectedPacks) {
      if (!this.packsAjoutes.find(p => p.id === pack.id)) {
        this.packsAjoutes.push(pack);
      }
    }
    this.selectedPacks = [];
    this.conditionForm.get('packs')?.setValue([]);
  }

  onSubmit() {
    const condition: any = {
      typeContrat: this.conditionForm.value.typeContrat,
      prime: this.conditionForm.value.prime,
      produits: this.produitsAjoutes.map(p => ({ id: p.id })),
      packs: this.packsAjoutes.map(p => ({ id: p.id })),
      challenge: { id: this.challengeId }
    };

    if (this.isEditMode && this.editingConditionId) {
      this.conditionService.updateCondition(this.editingConditionId, condition).subscribe(() => {
        alert('Condition mise à jour !');
        this.resetForm();
        this.loadConditions();
      });
    } else {
      this.conditionService.createCondition(condition, this.challengeId).subscribe(() => {
        alert('Condition enregistrée !');
        this.resetForm();
        this.loadConditions();
      });
    }
  }

  editCondition(condition: any) {
    this.isEditMode = true;
    this.editingConditionId = condition.id;
    this.conditionForm.patchValue({
      typeContrat: condition.typeContrat,
      prime: condition.prime,
      produit: null
    });
    this.produitsAjoutes = condition.produits;
    this.packsAjoutes = condition.packs;
  }

  deleteCondition(conditionId: number) {
    if (confirm('Voulez-vous vraiment supprimer cette condition ?')) {
      this.conditionService.deleteCondition(conditionId).subscribe(() => {
        alert('Condition supprimée !');
        this.loadConditions();
      });
    }
  }

  resetForm() {
    this.conditionForm.reset();
    this.produitsAjoutes = [];
    this.packsAjoutes = [];
    this.isEditMode = false;
    this.editingConditionId = null;
  }
}