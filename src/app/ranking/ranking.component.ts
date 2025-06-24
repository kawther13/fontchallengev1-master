import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RankingService } from '../service/ranking.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,CommonModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent {
   selectedType: string = '';
challengeName: string = '';

dataSource = new MatTableDataSource<any>();

agentColumns: string[] = [
  'rank', 'nbrContrat', 'typeContrat', 'prime',
  'packs', 'produits', 'nomRegion', 'nameSale', 'typeAgence'
];

chefRegionColumns: string[] = [
  'rank', 'nbrContrat', 'prime', 'nomRegion'
];

chefAgenceColumns: string[] = [
  'rank', 'nbrContrat', 'prime', 'nomRegion', 'typeAgence'
];

@ViewChild(MatPaginator) paginator!: MatPaginator;

constructor(private rankingService: RankingService) {}

onSearch() {
  if (this.selectedType && this.challengeName) {
    this.rankingService.getRankingByTypeAndChallenge(this.selectedType, this.challengeName)
      .subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      });
  }
}
}