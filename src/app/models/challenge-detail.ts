import { Concerner } from "./concerner";
import { Condition } from "./condition";
import { ConditionGain } from "./condition-gain";
import { RolePaliers } from "./role-paliers";
import { ScoreRule } from "./score-rule";

export interface ChallengeDetail {
    id: number;
  name: string;
  dateDebut: string;
  dateFin: string;
  description: string;
  scorerule: ScoreRule[];
  concerners: Concerner[];
  condition: Condition[];
  conditionGains: ConditionGain[];
  rolePaliers: RolePaliers[];
}
