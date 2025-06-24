export interface ConditionGain {
  id?: number;
  role: string;
  typeContrat: string;
  nbrContrat: number;
  prime: number;
  challenge?: { id: number }; // optionnel pour liaison
}
