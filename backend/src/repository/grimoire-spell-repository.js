const pool = require("../database/pool");
const GrimoireSpell = require("../model/grimoire-spell-model");
const { factory } = require("../utils/factory");
const logger = require("../utils/logger");
const { whereAndStackError } = require("../utils/where-and-stack-error");

class GrimoireSpellRepository {
  /**
   * 
   * @param {integer} userId 
   * @returns {Promise<Array<GrimoireSpell>>}
   */
  async listAssociationsByUserId(userId) {
    try {
      const sql = 
        `SELECT 
          gs.grimoire_id,
          g."name" grimoire_name,
          gs.spell_id,
          s."name" spell_name,
          gs.user_id,
          gs."prepared" 
        FROM gre.grimoire_spell gs
        JOIN gre.grimoire g ON g.grimoire_id = gs.grimoire_id 
        JOIN spl.spell s ON s.spell_id = gs.spell_id 
        WHERE gs.user_id = $1
        ORDER BY s.circle ASC, s."name" ASC;`;
      
      const params = [userId];
      const result = await pool.query(sql, params);
      return factory(result.rows, GrimoireSpell);
    } catch (error) {
      logger.error(`Ocorreu um erro ao listar as magias do grimório do usuário ${userId} no DB. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao listar as magias do grimório.");
    }
  }

  /**
   * 
   * @param {GrimoireSpell} grimoireSpellDto 
   * @returns {Promise<GrimoireSpell>}
   */
  async associate(grimoireSpellDto) {
    try {
      const sql = 
        `INSERT INTO gre.grimoire_spell (
          grimoire_id,
          spell_id,
          user_id
        ) VALUES (
          $1, $2, $3
        ) RETURNING *;`;
      
      const params = [
        grimoireSpellDto.grimoireId,
        grimoireSpellDto.spellId,
        grimoireSpellDto.userId,
      ];
      const result = await pool.query(sql, params);
      return result.rowCount > 0 ? (factory(result.rows, GrimoireSpell))[0] : null;
    } catch (error) {
      logger.error(`Ocorreu um erro ao associar o grimório à magia no DB. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao associar o grimório à magia.");
    }
  }

  /**
   * 
   * @param {Array<GrimoireSpell>} grimoireSpellsDto 
   * @returns {Promise<Array<GrimoireSpell>>}
   */
  async associateMultiple(grimoireSpellsDto) {
    try {
      let sql = 
        `INSERT INTO gre.grimoire_spell (
          grimoire_id,
          spell_id,
          user_id
        ) VALUES $replaceValues
        ON CONFLICT DO NOTHING
        RETURNING *;`;
      
      const values = grimoireSpellsDto.map((spellDto) => `(${spellDto.grimoireId}, ${spellDto.spellId}, ${spellDto.userId})`);
      sql = sql.replace("$replaceValues", values.join(","));
      const result = await pool.query(sql, []);
      return factory(result.rows, GrimoireSpell);
    } catch (error) {
      logger.error(`Ocorreu um erro ao associar múltiplas magias ao grimório no DB. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao associar múltiplas magias ao grimório.");
    }
  }

  /**
   * 
   * @param {GrimoireSpell} grimoireSpellDto 
   * @returns {Promise<GrimoireSpell>}
   */
  async update(grimoireSpellDto) {
    try {
      const sql = 
        `UPDATE gre.grimoire_spell SET
          prepared = $4
        WHERE grimoire_id = $1
          AND spell_id = $2
          AND user_id = $3
        RETURNING *;`;
      
      const params = [
        grimoireSpellDto.grimoireId,
        grimoireSpellDto.spellId,
        grimoireSpellDto.userId,
        grimoireSpellDto.prepared,
      ];
      const result = await pool.query(sql, params);
      return result.rowCount > 0 ? (factory(result.rows, GrimoireSpell))[0] : null;
    } catch (error) {
      logger.error(`Ocorreu um erro ao atualizar a magia do grimório no DB. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao atualizar a magia do grimório.");
    }
  }

  /**
   * 
   * @param {GrimoireSpell} grimoireSpellDto 
   * @returns {Promise<GrimoireSpell>}
   */
  async disassociate(grimoireSpellDto) {
    try {
      const sql = 
        `DELETE FROM gre.grimoire_spell
        WHERE grimoire_id = $1
          AND spell_id = $2
          AND user_id = $3
        RETURNING *;`;
      
      const params = [
        grimoireSpellDto.grimoireId,
        grimoireSpellDto.spellId,
        grimoireSpellDto.userId,
      ];
      const result = await pool.query(sql, params);
      return result.rowCount > 0 ? (factory(result.rows, GrimoireSpell))[0] : null;
    } catch (error) {
      logger.error(`Ocorreu um erro ao desassociar o grimório à magia no DB. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao desassociar o grimório à magia.");
    }
  }
}

module.exports = GrimoireSpellRepository;
