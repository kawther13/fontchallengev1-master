import { ConditionProduitPack } from "./condition-produit-pack";

export interface Condition {
produits: any;
    id?: number;
  typeContrat: string;
  prime: number;
  produitPacks: ConditionProduitPack[];
}
