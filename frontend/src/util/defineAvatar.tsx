import AB from "assets/img/AB.png";
import DV from "assets/img/DV.png";
import CO from "assets/img/CO.png";
import EN from "assets/img/EN.png";
import EV from "assets/img/EV.png";
import IL from "assets/img/IL.png";
import NE from "assets/img/NE.png";
import TR from "assets/img/TR.png";
import BLACK_AB from "assets/img/black_AB.png";
import BLACK_DV from "assets/img/black_DV.png";
import BLACK_CO from "assets/img/black_CO.png";
import BLACK_EN from "assets/img/black_EN.png";
import BLACK_EV from "assets/img/black_EV.png";
import BLACK_IL from "assets/img/black_IL.png";
import BLACK_NE from "assets/img/black_NE.png";
import BLACK_TR from "assets/img/black_TR.png";
import {
  SCHOOL_ABJURATION_ID,
  SCHOOL_CONVOCATION_ID,
  SCHOOL_DIVINATION_ID,
  SCHOOL_ENCHANTMENT_ID,
  SCHOOL_EVOCATION_ID,
  SCHOOL_ILLUSION_ID,
  SCHOOL_NECROMANCY_ID,
  SCHOOL_TRANSMUTATION_ID,
} from "constants/spell.constants";

const defineAvatar = (schoolId: number): string => {
  let avatar;
  switch (schoolId) {
    case SCHOOL_ABJURATION_ID:
      avatar = AB;
      break;
    case SCHOOL_DIVINATION_ID:
      avatar = DV;
      break;
    case SCHOOL_CONVOCATION_ID:
      avatar = CO;
      break;
    case SCHOOL_ENCHANTMENT_ID:
      avatar = EN;
      break;
    case SCHOOL_EVOCATION_ID:
      avatar = EV;
      break;
    case SCHOOL_ILLUSION_ID:
      avatar = IL;
      break;
    case SCHOOL_NECROMANCY_ID:
      avatar = NE;
      break;
    case SCHOOL_TRANSMUTATION_ID:
      avatar = TR;
      break;

    default:
      break;
  }

  return avatar;
};

const defineAvatarBlack = (schoolId: number): string => {
  let avatar;
  switch (schoolId) {
    case SCHOOL_ABJURATION_ID:
      avatar = BLACK_AB;
      break;
    case SCHOOL_DIVINATION_ID:
      avatar = BLACK_DV;
      break;
    case SCHOOL_CONVOCATION_ID:
      avatar = BLACK_CO;
      break;
    case SCHOOL_ENCHANTMENT_ID:
      avatar = BLACK_EN;
      break;
    case SCHOOL_EVOCATION_ID:
      avatar = BLACK_EV;
      break;
    case SCHOOL_ILLUSION_ID:
      avatar = BLACK_IL;
      break;
    case SCHOOL_NECROMANCY_ID:
      avatar = BLACK_NE;
      break;
    case SCHOOL_TRANSMUTATION_ID:
      avatar = BLACK_TR;
      break;

    default:
      break;
  }

  return avatar;
};

export { defineAvatar, defineAvatarBlack };
