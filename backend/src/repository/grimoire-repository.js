const pool = require("../database/pool");
const Grimoire = require("../model/grimoire-model");
const { factory } = require("../utils/factory");
const logger = require("../utils/logger");
const { whereAndStackError } = require("../utils/where-and-stack-error");

class GrimoireRepository {
  /**
   * 
   * @param {integer} grimoireId 
   * @returns {Promise<Grimoire>}
   */
  async getGrimoireById(grimoireId) {
    try {
      const sql = 
        `SELECT
          g.grimoire_id,
          g.name,
          g.user_id
        FROM gre.grimoire g
        WHERE g.grimoire_id = $1;`;

      const params = [grimoireId];
      const result = await pool.query(sql, params);
      return result.rowCount > 0 ? (factory(result.rows, Grimoire))[0] : null;
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar buscar o grimório pela ID ${grimoireId} no DB. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao tentar buscar o grimório.");
    }
  }

  /**
   * 
   * @param {integer} userId 
   * @returns {Promise<Array<Grimoire>>}
   */
  async listGrimoireByUserId(userId) {
    try {
      const sql = 
        `SELECT
          g.grimoire_id,
          g.name,
          g.user_id
        FROM gre.grimoire g
        WHERE g.user_id = $1
        ORDER BY g.name ASC;`;

      const params = [userId];
      const result = await pool.query(sql, params);
      return factory(result.rows, Grimoire);
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar listar os grimórios pelo usuário ${userId} no DB. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao tentar listar os grimórios.");
    }
  }

  /**
   * 
   * @param {string} name 
   * @param {integer} userId 
   * @returns {Promise<Array<Grimoire>>}
   */
  async listGrimoireByNameAndUserId(name, userId) {
    try {
      name = `%${name}%`;

      const sql = 
        `SELECT
          g.grimoire_id,
          g.name,
          g.user_id
        FROM gre.grimoire g
        WHERE g.name ilike $1
          AND g.user_id = $2
        ORDER BY g.name ASC;`;

      const params = [name, userId];
      const result = await pool.query(sql, params);
      return factory(result.rows, Grimoire);
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar listar os grimórios pelo nome ${name} e usuário ${userId} no DB. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao tentar listar os grimórios.");
    }
  }

  /**
   * 
   * @param {string} name 
   * @param {integer} userId 
   * @returns {Promise<Grimoire>}
   */
  async createGrimoire(name, userId) {
    try {
      const sql = 
        `INSERT INTO gre.grimoire (
          name,
          user_id
        ) VALUES (
          $1, $2 
        ) RETURNING *;`;

      const params = [name, userId];
      const result = await pool.query(sql, params);
      return result.rowCount > 0 ? (factory(result.rows, Grimoire))[0] : null;
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar criar o grimório pelo nome ${name} e usuário ${userId} no DB. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao tentar criar o grimório.");
    }
  }

  /**
   * 
   * @param {Grimoire} grimoireDto 
   * @returns {Promise<Grimoire>}
   */
  async updateGrimoire(grimoireDto) {
    try {
      const sql = 
        `UPDATE gre.grimoire SET
          name = $3
        WHERE grimoire_id = $1
          AND user_id = $2  
        RETURNING *;`;

      const params = [
        grimoireDto.grimoireId,
        grimoireDto.userId,
        grimoireDto.name,
      ];
      const result = await pool.query(sql, params);
      return result.rowCount > 0 ? (factory(result.rows, Grimoire))[0] : null;
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar atualizar o grimório no DB. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao tentar atualizar o grimório.");
    }
  }

  async deleteGrimoire(grimoireId, userId) {
    try {
      const sql = 
        `DELETE FROM gre.grimoire
        WHERE grimoire_id = $1
          AND user_id = $2  
        RETURNING *;`;

      const params = [
        grimoireId,
        userId,
      ];
      const result = await pool.query(sql, params);
      return result.rowCount > 0 ? (factory(result.rows, Grimoire))[0] : null;
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar excluir o grimório no DB. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao tentar excluir o grimório.");
    }
  }
}

module.exports = GrimoireRepository;
