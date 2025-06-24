import { PalierClassement } from "./palier-classement";
import { PalierCommission } from "./palier-commission";
import { PalierIntervalle } from "./palier-intervalle";

export interface RolePaliers {
  id?: number;
  role: string;
  typeGain: string;
  palierClassements: PalierClassement[];
  palierIntervalles: PalierIntervalle[];
  commissions: PalierCommission[];
}
