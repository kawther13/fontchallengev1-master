import { Component } from '@angular/core';
import { ContractType, Product, SalesTransaction, TransactionNature } from '../../models/sales-transaction';
import { SalesTransactionService } from '../../service/sales-transaction.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-sales-transaction',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-sales-transaction.component.html',
  styleUrl: './add-sales-transaction.component.css'
})
export class AddSalesTransactionComponent {

transaction: SalesTransaction = {
    nom: '',
    sellerRole: '',
    packtype: '',
    product: Product.Avenir_Jeunesse,
    contractType: ContractType.RENOUVELABLE,
    transactionNature: TransactionNature.AFFAIRE_NOUVELLE,
    nbrContrat: 0,
    prime: 0,
    nomAgence: '',
    nomRegion: '',
    dateTransaction: ''
  };

  productTypes = Object.values(Product);
  contractTypes = Object.values(ContractType);
  transactionNatures = Object.values(TransactionNature);

  constructor(private transactionService: SalesTransactionService) {}

  onSubmit(): void {
    this.transactionService.addTransaction(this.transaction).subscribe(() => {
      alert("Transaction enregistrée !");
      this.transaction = {
        nom: '',
        sellerRole: '',
        packtype: '',
        product: Product.Assurance_Junior,
        contractType: ContractType.RENOUVELABLE,
        transactionNature: TransactionNature.AFFAIRE_NOUVELLE,
        nbrContrat: 0,
        prime: 0,
        nomAgence: '',
        nomRegion: '',
        dateTransaction: ''
      };
    });
  }
}
