interface implementsI {
  cost: string;
  description: string;
}

export interface Spell {
  spellId: number;
  circle: number;
  name: string;
  execution: string;
  range: string;
  target: string;
  duration: string;
  resistance: string;
  area: string;
  type: string;
  description: string;
  school: string;
  implements: implementsI[];
  executionId: number;
  rangeId: number;
  durationId: number;
  resistanceId: number;
  areaId: number;
  typeId: number;
  schoolId: number;
  prepared: boolean;
}