import { Component } from '@angular/core';
import { ProduitService } from '../../service/produit.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-list-prod',
  standalone: true,
  imports: [MatTableModule,
    MatIconModule,
    MatButtonModule,RouterLink],
  templateUrl: './list-prod.component.html',
  styleUrl: './list-prod.component.css'
})
export class ListProdComponent {

produits: any[] = [];
  displayedColumns: string[] = ['name', 'actions'];

  constructor(private produitService: ProduitService,private router: Router) {}

  ngOnInit(): void {
    this.getProduits();
  }

  getProduits(): void {
    this.produitService.getAllProduits().subscribe(data => {
      this.produits = data;
      console.log(data)
    });
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.produitService.deleteProduit(id).subscribe(() => {
        this.getProduits();
      });
    }
  }
onEdit(produit: any): void {
  // Exemple : navigation vers /produits/edit/:id
  this.router.navigate(['home/produits/edit', produit.id]);
}

}
