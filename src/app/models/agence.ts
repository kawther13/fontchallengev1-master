import { Region } from "./region";

export interface Agence {
id?: number;
  codeAgence: number;
  mail: string;
  typeAgence: string;
  nom: string;
  
  region: Region;
}

