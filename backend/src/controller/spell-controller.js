const {
  SCHOOL_ABJURATION_ID,
  SCHOOL_DIVINATION_ID,
  SCHOOL_CONVOCATION_ID,
  SCHOOL_ENCHANTMENT_ID,
  SCHOOL_EVOCATION_ID,
  SCHOOL_ILLUSION_ID,
  SCHOOL_NECROMANCY_ID,
  SCHOOL_TRANSMUTATION_ID,
  TYPE_ARCANE_ID,
  TYPE_DIVINE_ID,
  TYPE_UNIVERSAL_ID,
  FORTITUDE_ID,
  REFLEXES_ID,
  WILL_ID,
  FORTITUDE_PARTIAL_ID,
  FORTITUDE_CANCEL_ID,
  FORTITUDE_REDUCE_TO_HALF_ID,
  FORTITUDE_SEE_TEXT_ID,
  WILL_PARTIAL_ID,
  WILL_CANCEL_ID,
  WILL_DISCREDIT_ID,
  WILL_CANCEL_SEE_TEXT_ID,
  REFLEXES_PARTIAL_ID,
  REFLEXES_CANCEL_ID,
  REFLEXES_REDUCE_TO_HALF_ID,
  REFLEXES_SEE_TEXT_ID,
} = require("../constants/spell-constants");
const SpellRepository = require("../repository/spell-repository");
const { flexibleSearch } = require("../utils/flexible-search");
const logger = require("../utils/logger");
const { toLogico } = require("../utils/parser");
const { whereAndStackError } = require("../utils/where-and-stack-error");

class SpellController {
  async getSpellById(req, res) {
    try {
      const spell = await new SpellRepository().getSpellById(req.params.spellId);
      
      if (!spell) {
        return res.status(404).send({
          errors: [{ msg: "Magia não encontrada." }],
        });
      } 
      return res.status(200).send({ spell });
    } catch (error) {
      logger.error(
        `Ocorreu um erro ao consultar a magia pela ID. ${whereAndStackError(
          __filename,
          error
        )}`
      );
      return res.status(400).send({
        errors: [{ msg: error.message }],
      });
    }
  }

  async listAll(req, res) {
    try {
      const spells = await new SpellRepository().listAll();
      return res.status(200).send({ spells });
    } catch (error) {
      logger.error(
        `Ocorreu um erro ao listar as magias. ${whereAndStackError(
          __filename,
          error
        )}`
      );
      return res.status(400).send({
        errors: [{ msg: error.message }],
      });
    }
  }

  async listSpellByGrimoireIdAndUserId(req, res) {
    try {
      const spells = await new SpellRepository().listSpellByGrimoireIdAndUserId(req.params.grimoireId, req.user.userId);
      return res.status(200).send({ spells });
    } catch (error) {
      logger.error(
        `Ocorreu um erro ao listar as magias. ${whereAndStackError(
          __filename,
          error
        )}`
      );
      return res.status(400).send({
        errors: [{ msg: error.message }],
      });
    }
  }

  async list(req, res) {
    try {
      let typesIds = [
        toLogico(req.query.arcane) ? TYPE_ARCANE_ID : null,
        toLogico(req.query.divine) ? TYPE_DIVINE_ID : null,
        toLogico(req.query.universal) ? TYPE_UNIVERSAL_ID : null,
      ];

      let schoolsIds = [
        toLogico(req.query.abjuration) ? SCHOOL_ABJURATION_ID : null,
        toLogico(req.query.divination) ? SCHOOL_DIVINATION_ID : null,
        toLogico(req.query.convocation) ? SCHOOL_CONVOCATION_ID : null,
        toLogico(req.query.enchantment) ? SCHOOL_ENCHANTMENT_ID : null,
        toLogico(req.query.evocation) ? SCHOOL_EVOCATION_ID : null,
        toLogico(req.query.illusion) ? SCHOOL_ILLUSION_ID : null,
        toLogico(req.query.necromancy) ? SCHOOL_NECROMANCY_ID : null,
        toLogico(req.query.transmutation) ? SCHOOL_TRANSMUTATION_ID : null,
      ];

      const filteredTypesIds = typesIds.filter((el) => el);
      const filteredSchoolsIds = schoolsIds.filter((el) => el);

      if (filteredTypesIds.length > 0) {
        req.query.typeId = filteredTypesIds;
      }
      if (filteredSchoolsIds.length > 0) {
        req.query.schoolId = filteredSchoolsIds;
      }

      let resistances = [];

      if (Number(req.query.resistanceId)) {
        switch (Number(req.query.resistanceId)) {
          case FORTITUDE_ID:
            resistances.push(
              FORTITUDE_PARTIAL_ID,
              FORTITUDE_CANCEL_ID,
              FORTITUDE_REDUCE_TO_HALF_ID,
              FORTITUDE_SEE_TEXT_ID,
            );
            break;
          case REFLEXES_ID:
            resistances.push(
              REFLEXES_PARTIAL_ID,
              REFLEXES_CANCEL_ID,
              REFLEXES_REDUCE_TO_HALF_ID,
              REFLEXES_SEE_TEXT_ID,
            );
            break;
          case WILL_ID:
              resistances.push(
                WILL_PARTIAL_ID,
                WILL_CANCEL_ID,
                WILL_DISCREDIT_ID,
                WILL_CANCEL_SEE_TEXT_ID,
              );
              
            break;
        
          default:
            break;
        }
      }

      if (resistances.length > 0) {
        req.query.resistanceId = resistances;
      }

      const { spells, totalRows } = await flexibleSearch(
        ["keywords"],
        [
          "circle",
          "executionId",
          "durationId",
          "rangeId",
          "areaId",
          "resistanceId",
          "typeId",
          "schoolId",
          "grimoireId",
        ],
        [],
        [],
        req.query.sort ? req.query.sort.split(",") : ["name", "asc"],
        ["asc", "desc"],
        req.query.page,
        new SpellRepository().list,
        req,
        null,
        []
      );
      return res.status(200).send({ spells, totalRows });
    } catch (error) {
      logger.error(
        `Ocorreu um erro ao listar as magias. ${whereAndStackError(
          __filename,
          error
        )}`
      );
      return res.status(400).send({
        errors: [{ msg: error.message }],
      });
    }
  }
}

module.exports = new SpellController();
