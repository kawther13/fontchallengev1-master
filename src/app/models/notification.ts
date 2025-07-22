export interface Notification {
  id: number;
  titre: string;
  message: string;
  vue: boolean;
  type: string;
  etatReponse: string;
  date: string;
  challengeId: number;
  destinataire: {
    id: number;
    codePar: string;
    nom: string;
    email: string;
    role: string;
    region: string;
    etat: string;
  };
}