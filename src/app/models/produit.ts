import { Pack } from "./pack";

export interface Produit {
    id?: number;
  name: string;
  packs: Pack[];
}
