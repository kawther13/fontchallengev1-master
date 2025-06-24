export interface ScoreRule {

    id?: number;             // optionnel : pour update
  typeScore: string;       // "pack" | "revenu" | "typeContrat"
  pack?: string;           // si typeScore = "pack"
  revenu?: number;         // si typeScore = "revenu"
  typeContrat?: string;    // si typeScore = "typeContrat"
  point: number;           // nombre de points
  challengeId: number;
}
