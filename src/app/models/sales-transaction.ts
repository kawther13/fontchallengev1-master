
export enum Product {
  Trik_Esslama = 'Trik_Esslama',
  Dar_Esslama = 'Dar_Esslama',
  STARCARE = 'STARCARE',
  STARCARE_International = 'STARCARE_International',
  Assistance_Voyage = 'Assistance_Voyage',
  Décès_Prévoyance = 'Décès_Prévoyance',
  Garantie_Accidents_de_la_Vie_Individuel = 'Garantie_Accidents_de_la_Vie_Individuel',
  Assurance_Emprunteur = 'Assurance_Emprunteur',
  Assurance_Junior = 'Assurance_Junior',
  Hayya = 'Hayya',
  Avenir_Jeunesse = 'Avenir_Jeunesse',
  Vie_Nouvelle = 'Vie_Nouvelle',
  Slamet_Errezk = 'Slamet_Errezk',
  Multirisque_Agricole = 'Multirisque_Agricole',
  Santé_Collective = 'Santé_Collective',
  Retraite_Collective = 'Retraite_Collective',
  Indemnité_de_Départ_à_la_Retraite = 'Indemnité_de_Départ_à_la_Retraite',
  Responsabilité_Civile_Décennale = 'Responsabilité_Civile_Décennale',
  Tous_Risques_Chantier = 'Tous_Risques_Chantier',
  Transport_Facultés = 'Transport_Facultés',
  Flotte_Automobile = 'Flotte_Automobile',
  Homme_Clé = 'Homme_Clé'
}


export enum ContractType {
  RENOUVELABLE = 'RENOUVELABLE',
  FORFAITAIRE = 'FORFAITAIRE'
}

export enum TransactionNature {
  AFFAIRE_NOUVELLE='AFFAIRE_NOUVELLE',
    TRANSFERT_EXTERNE='TRANSFERT_EXTERNE',
    VERSEMENT_LIBRE='VERSEMENT_LIBRE'
}

export interface SalesTransaction {
  id?: number;
  nom: string;
  sellerRole: string;
  packtype: string;
  product: Product;
  contractType: ContractType;
  transactionNature: TransactionNature;
  nbrContrat: number;
  prime: number;
  nomAgence: string;
  nomRegion: string;
  dateTransaction: string;
  challengeId?: number;
}
