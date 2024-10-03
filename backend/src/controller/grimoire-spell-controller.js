const GrimoireSpellRepository = require("../repository/grimoire-spell-repository");
const { body, validationResult, param } = require("express-validator");
const logger = require("../utils/logger");
const { whereAndStackError } = require("../utils/where-and-stack-error");
const GrimoireSpell = require("../model/grimoire-spell-model");

class GrimoireSpellController {
  validate() {
    return [
      body("grimoireId", "ID do grimório é inválido.")
        .notEmpty().withMessage("ID do grimório não pode ser vazio.")
        .isInt().withMessage("ID do grimório deve ser um número inteiro."),
      body("spellId", "ID da magia é inválida.")
        .notEmpty().withMessage("ID da magia não pode ser vazio.")
        .isInt().withMessage("ID da magia deve ser um número inteiro."),
    ];
  }

  async listAssociationsByUserId(req, res) {
    try {
      const spells = await new GrimoireSpellRepository().listAssociationsByUserId(req.user.userId);

      return res.status(200).send({ spells });
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar listar as magias do grimório. ${whereAndStackError(__filename, error)}`);
      return res.status(400).send({ errors: { msg: error.message } });
    }
  }

  async associate(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const spell = await new GrimoireSpellRepository().associate(new GrimoireSpell({
        grimoireId: req.body.grimoireId,
        spellId: req.body.spellId,
        userId: req.user.userId,
      }));

      return res.status(200).send({ spell });
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar associar uma magia ao grimório. ${whereAndStackError(__filename, error)}`);
      return res.status(400).send({ errors: { msg: error.message } });
    }
  }

  async associateMultiple(req, res) {
    try {
      const spellsDto = req.body.idsSpells.map((id) => {
        return {
          grimoireId: req.body.grimoireId,
          spellId: id,
          userId: req.user.userId,
        };
      });
      const spells = await new GrimoireSpellRepository().associateMultiple(spellsDto);

      return res.status(200).send({ spells });
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar associar múltiplas magias ao grimório. ${whereAndStackError(__filename, error)}`);
      return res.status(400).send({ errors: { msg: error.message } });
    }
  }

  async update(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const spell = await new GrimoireSpellRepository().update(new GrimoireSpell({
        grimoireId: req.body.grimoireId,
        spellId: req.body.spellId,
        userId: req.user.userId,
        prepared: req.body.prepared,
      }));

      if (!spell) {
        return res.status(404).send({ errors: [{ msg: "Não foi possível encontrar a magia para atualizar." }] });
      }

      return res.status(200).send({ spell });
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar atualizar uma magia do grimório. ${whereAndStackError(__filename, error)}`);
      return res.status(400).send({ errors: { msg: error.message } });
    }
  }

  async disassociate(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const spell = await new GrimoireSpellRepository().disassociate(new GrimoireSpell({
        grimoireId: req.body.grimoireId,
        spellId: req.body.spellId,
        userId: req.user.userId,
      }));

      if (!spell) {
        return res.status(404).send({ errors: [{ msg: "Não foi possível encontrar a magia para remover." }] });
      }

      return res.status(200).send({ msg: "Magia removida com sucesso." });
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar desassociar uma magia ao grimório. ${whereAndStackError(__filename, error)}`);
      return res.status(400).send({ errors: [{ msg: error.message }] });
    }
  }
}

module.exports = new GrimoireSpellController();
