import { FormSpell } from "models/form-spell";

export default class FormSpellImp implements FormSpell {
  arcane: boolean;
  divine: boolean;
  universal: boolean;
  abjuration: boolean;
  divination: boolean;
  convocation: boolean;
  enchantment: boolean;
  evocation: boolean;
  illusion: boolean;
  necromancy: boolean;
  transmutation: boolean;
  keywords: string;
  executionId: number;
  durationId: number;
  rangeId: number;
  areaId: number;
  resistanceId: number;
  publication: number;

  constructor() {
    this.arcane = false;
    this.divine = false;
    this.universal = false;
    this.abjuration = false;
    this.divination = false;
    this.convocation = false;
    this.enchantment = false;
    this.evocation = false;
    this.illusion = false;
    this.necromancy = false;
    this.transmutation = false;
    this.keywords = "";
    this.executionId = null;
    this.durationId = null;
    this.rangeId = null;
    this.areaId = null;
    this.resistanceId = null;
    this.publication = null;
  }
}
