import {
  SCHOOL_ABJURATION_ID,
  SCHOOL_CONVOCATION_ID,
  SCHOOL_DIVINATION_ID,
  SCHOOL_ENCHANTMENT_ID,
  SCHOOL_EVOCATION_ID,
  SCHOOL_ILLUSION_ID,
  SCHOOL_NECROMANCY_ID,
  SCHOOL_TRANSMUTATION_ID,
  SPELL_TYPE_ARCANE_ID,
  SPELL_TYPE_DIVINE_ID,
  SPELL_TYPE_UNIVERSAL_ID,
} from "constants/spell.constants";
import SPELL_TYPE_AR_ICO from "assets/Tormenta20-Assets/Classificacao/SVG/Arcana-icon.svg";
import SPELL_TYPE_DV_ICO from "assets/Tormenta20-Assets/Classificacao/SVG/Divina-icon.svg";
import SPELL_TYPE_UN_ICO from "assets/Tormenta20-Assets/Classificacao/SVG/Universal-icon.svg";
import AB from "assets/Tormenta20-Assets/Escolas/SVG/abjuracao-icon.svg";
import DV from "assets/Tormenta20-Assets/Escolas/SVG/Adivinhacao-icon.svg";
import CO from "assets/Tormenta20-Assets/Escolas/SVG/convocacao-icon.svg";
import EN from "assets/Tormenta20-Assets/Escolas/SVG/Encantamento-icon.svg";
import EV from "assets/Tormenta20-Assets/Escolas/SVG/evocacao-icon.svg";
import IL from "assets/Tormenta20-Assets/Escolas/SVG/Ilusao-icon.svg";
import NE from "assets/Tormenta20-Assets/Escolas/SVG/necromancia-icon.svg";
import TR from "assets/Tormenta20-Assets/Escolas/SVG/transmutacao-icon.svg";

const defineSpellTypeIcon = (typeId: number): string => {
  let icon;
  switch (typeId) {
    case SPELL_TYPE_ARCANE_ID:
      icon = SPELL_TYPE_AR_ICO;
      break;
    case SPELL_TYPE_DIVINE_ID:
      icon = SPELL_TYPE_DV_ICO;
      break;
    case SPELL_TYPE_UNIVERSAL_ID:
      icon = SPELL_TYPE_UN_ICO;
      break;

    default:
      break;
  }

  return icon;
};

const defineSchoolIcon = (schoolId: number): string => {
  let icon;
  switch (schoolId) {
    case SCHOOL_ABJURATION_ID:
      icon = AB;
      break;
    case SCHOOL_DIVINATION_ID:
      icon = DV;
      break;
    case SCHOOL_CONVOCATION_ID:
      icon = CO;
      break;
    case SCHOOL_ENCHANTMENT_ID:
      icon = EN;
      break;
    case SCHOOL_EVOCATION_ID:
      icon = EV;
      break;
    case SCHOOL_ILLUSION_ID:
      icon = IL;
      break;
    case SCHOOL_NECROMANCY_ID:
      icon = NE;
      break;
    case SCHOOL_TRANSMUTATION_ID:
      icon = TR;
      break;

    default:
      break;
  }

  return icon;
};

export { defineSpellTypeIcon, defineSchoolIcon };
