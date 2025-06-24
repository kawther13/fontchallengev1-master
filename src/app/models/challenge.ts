import { Concerner } from "./concerner";

export interface Challenge {
  id?: number;
  name: string;
  dateDebut: string;   // sous forme ISO : 'YYYY-MM-DD'
  dateFin: string;
  description: string;
  concerners: Concerner[];
}
