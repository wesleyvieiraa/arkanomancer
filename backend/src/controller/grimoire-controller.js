const { body, validationResult, param } = require("express-validator");
const GrimoireRepository = require("../repository/grimoire-repository");
const logger = require("../utils/logger");
const { whereAndStackError } = require("../utils/where-and-stack-error");
const Grimoire = require("../model/grimoire-model");

class GrimoireController {
  validateCreation() {
    return [
      body("name", "Nome é inválido.")
        .notEmpty().withMessage("Nome não pode ser vazio.")
        .isLength({ min: 3, max: 255 }).withMessage("Nome deve ter entre 3 e 255 caracteres.")
    ];
  }

  validateUpdate() {
    return [
      param("grimoireId", "ID do grimório é inválido.")
        .notEmpty().withMessage("ID do grimório não pode ser vazio.")
        .isInt().withMessage("ID do grimório deve ser um número inteiro."),
      body("name", "Nome é inválido.")
        .notEmpty().withMessage("Nome não pode ser vazio.")
        .isLength({ min: 3, max: 255 }).withMessage("Nome deve ter entre 3 e 255 caracteres.")
    ];
  }
  async getGrimoireById(req, res) {
    try {
      const grimoire = await new GrimoireRepository().getGrimoireById(req.params.grimoireId);
      if (!grimoire) {
        return res.status(404).json({ message: "Grimório não encontrado" });
      }

      return res.status(200).send({ grimoire });
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar buscar um grimório pela ID. ${whereAndStackError(__filename, error)}`);
      return res.status(400).send({ errors: [{ msg: error.message }] });
    }
  }

  async listGrimoireByUserId(req, res) {
    try {
      const grimoires = await new GrimoireRepository().listGrimoireByUserId(req.user.userId);
      return res.status(200).send({ grimoires });
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar listar os grimórios do usuário. ${whereAndStackError(__filename, error)}`);
      return res.status(400).send({ errors: [{ msg: error.message }] });
    }
  }

  async listGrimoireByNameAndUserId(req, res) {
    try {
      const grimoires = await new GrimoireRepository().listGrimoireByNameAndUserId(req.params.name, req.user.userId);
      return res.status(200).send({ grimoires });
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar listar os grimórios do usuário pelo nome. ${whereAndStackError(__filename, error)}`);
      return res.status(400).send({ errors: [{ msg: error.message }] });
    }
  }

  async createGrimoire(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const grimoire = await new GrimoireRepository().createGrimoire(req.body.name, req.user.userId);
      return res.status(200).send({ grimoire });
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar criar o grimório. ${whereAndStackError(__filename, error)}`);
      return res.status(400).send({ errors: [{ msg: error.message }] });
    }
  }

  async updateGrimoire(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const grimoire = await new GrimoireRepository().updateGrimoire(new Grimoire({
        grimoireId: req.params.grimoireId,
        name: req.body.name,
        userId: req.user.userId,
      }));

      if (!grimoire) {
        return res.status(404).json({ message: "Grimório não encontrado." });
      }

      return res.status(200).send({ grimoire });
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar atualizar o grimório do usuário. ${whereAndStackError(__filename, error)}`);
      return res.status(400).send({ errors: [{ msg: error.message }] });
    }
  }
  
  async deleteGrimoire(req, res) {
    try {
      const grimoire = await new GrimoireRepository().deleteGrimoire(req.params.grimoireId, req.user.userId);

      if (!grimoire) {
        return res.status(404).json({ message: "Grimório não encontrado." });
      }

      return res.status(200).send({ msg: "Grimório excluído." });
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar excluir o grimório do usuário. ${whereAndStackError(__filename, error)}`);
      return res.status(400).send({ errors: [{ msg: error.message }] });
    }
  }

}

module.exports = new GrimoireController();
