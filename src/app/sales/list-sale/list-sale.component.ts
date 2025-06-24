import { Component } from '@angular/core';
import { SalesTransactionService } from '../../service/sales-transaction.service';
import { SalesTransaction } from '../../models/sales-transaction';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-sale',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './list-sale.component.html',
  styleUrl: './list-sale.component.css'
})
export class ListSaleComponent {

challengeId: number = 0;
  transactions: SalesTransaction[] = [];
  isLoading = false;

  constructor(private salesService: SalesTransactionService) {}

  loadTransactions() {
    if (!this.challengeId) return;
    this.isLoading = true;
    this.salesService.getByChallengeId(this.challengeId).subscribe({
      next: (data:any) => {
        this.transactions = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erreur :", err);
        this.transactions = [];
        this.isLoading = false;
      }
    });
  }


  viewTransaction(id: number | undefined) {
  if (id === undefined) return;
  alert(`Afficher la transaction ${id}`);
  // Ou router vers une page détails
  // this.router.navigate(['/transactions', id]);
}

editTransaction(id: number| undefined) {
  if (id === undefined) return;
  alert(`Modifier la transaction ${id}`);
  // this.router.navigate(['/transactions/edit', id]);
  
}

deleteTransaction(id: number| undefined) {
  if (id === undefined) return;
  if (confirm('Voulez-vous vraiment supprimer cette transaction ?')) {
    this.salesService.deleteTransaction(id).subscribe(() => {
      this.transactions = this.transactions.filter(tx => tx.id !== id);
    });
  }
}

}
