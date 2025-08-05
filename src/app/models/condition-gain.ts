import { TypeContrat } from "./TypeContrat";

export interface ConditionGain {
  id?: number;
  role: string;
  typeContrat: TypeContrat;
  nbrContrat: number;
  prime: number;
  challenge?: { id: number }; // optionnel pour liaison
}
