const pool = require("../database/pool");
const Spell = require("../model/spell-model");
const { factory } = require("../utils/factory");
const logger = require("../utils/logger");
const PrepareSql = require("../utils/prepare-sql");
const { whereAndStackError } = require("../utils/where-and-stack-error");

class SpellRepository {

  async getSpellById(spellId) {
    try {
      const sql = 
        `SELECT
          s.spell_id,
          s.circle,
          s."name",
          e.execution_id,
          e."name" execution,
          r.range_id,
          r."name" "range",
          s.target,
          d.duration_id,
          d."name" duration,
          r2.resistance_id,
          r2."name" resistance,
          a.area_id,
          a."name" area,
          t.type_id,
          t."name" "type",
          s.description,
          s2.school_id,
          s2."name" school,
          ARRAY_AGG(
            jsonb_build_object(
              'cost', si."cost",
              'description', si.description 
            ) 
          ) implements
        FROM spl.spell s
        LEFT JOIN spl.execution e ON e.execution_id = s.execution_id
        LEFT JOIN spl."range" r ON r.range_id = s.range_id 
        LEFT JOIN spl.duration d ON d.duration_id = s.duration_id 
        LEFT JOIN spl.resistance r2 ON r2.resistance_id = s.resistance_id 
        LEFT JOIN spl.area a ON a.area_id = s.area_id 
        LEFT JOIN spl."type" t ON t.type_id = s.type_id 
        LEFT JOIN spl.school s2 ON s2.school_id = s.school_id
        LEFT JOIN spl.spell_implement si ON si.spell_id = s.spell_id 
        WHERE s.spell_id = $1
        GROUP BY 
          s.spell_id,
          s.circle,
          s."name",
          e.execution_id,
          r.range_id,
          s.target,
          d.duration_id,
          r2.resistance_id,
          a.area_id,
          t.type_id,
          s2.school_id
        ORDER BY s.circle, s."name", s2."name";`;

      const params = [spellId];
  
      const result = await pool.query(sql, params);
      const spells = factory(result.rows, Spell);
      return result.rowCount > 0 ? (spells)[0] : null;
    } catch (error) {
      logger.error(`Ocorreu um erro ao consultar o magia pela ID ${spellId} no DB. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao consultar o magia.");
    }
  }

  async listAll() {
    try {
      const sql = 
        `SELECT
          s.spell_id,
          s.circle,
          s."name",
          e.execution_id,
          e."name" execution,
          r.range_id,
          r."name" "range",
          s.target,
          d.duration_id,
          d."name" duration,
          r2.resistance_id,
          r2."name" resistance,
          a.area_id,
          a."name" area,
          t.type_id,
          t."name" "type",
          s.description,
          s2.school_id,
          s2."name" school,
          ARRAY_AGG(
            jsonb_build_object(
              'cost', si."cost",
              'description', si.description 
            ) 
          ) implements
        FROM spl.spell s
        LEFT JOIN spl.execution e ON e.execution_id = s.execution_id
        LEFT JOIN spl."range" r ON r.range_id = s.range_id 
        LEFT JOIN spl.duration d ON d.duration_id = s.duration_id 
        LEFT JOIN spl.resistance r2 ON r2.resistance_id = s.resistance_id 
        LEFT JOIN spl.area a ON a.area_id = s.area_id 
        LEFT JOIN spl."type" t ON t.type_id = s.type_id 
        LEFT JOIN spl.school s2 ON s2.school_id = s.school_id
        LEFT JOIN spl.spell_implement si ON si.spell_id = s.spell_id 
        GROUP BY 
          s.spell_id,
          s.circle,
          s."name",
          e.execution_id,
          r.range_id,
          s.target,
          d.duration_id,
          r2.resistance_id,
          a.area_id,
          t.type_id,
          s2.school_id
        ORDER BY s.circle, s."name", s2."name";`;

      const result = await pool.query(sql, []);
      return factory(result.rows, Spell);
    } catch (error) {
      logger.error(`Ocorreu um erro ao listar as magias no DB. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao listar as magias.");
    }
  }

  async listSpellByGrimoireIdAndUserId(grimoireId, userId) {
    try {
      const sql = 
        `SELECT
          s.spell_id,
          s.circle,
          s."name",
          e.execution_id,
          e."name" execution,
          r.range_id,
          r."name" "range",
          s.target,
          d.duration_id,
          d."name" duration,
          r2.resistance_id,
          r2."name" resistance,
          a.area_id,
          a."name" area,
          t.type_id,
          t."name" "type",
          s.description,
          s2.school_id,
          s2."name" school,
          gs."prepared",
          ARRAY_AGG(
            jsonb_build_object(
              'cost', si."cost",
              'description', si.description 
            ) 
          ) implements
        FROM spl.spell s
        LEFT JOIN spl.execution e ON e.execution_id = s.execution_id
        LEFT JOIN spl."range" r ON r.range_id = s.range_id 
        LEFT JOIN spl.duration d ON d.duration_id = s.duration_id 
        LEFT JOIN spl.resistance r2 ON r2.resistance_id = s.resistance_id 
        LEFT JOIN spl.area a ON a.area_id = s.area_id 
        LEFT JOIN spl."type" t ON t.type_id = s.type_id 
        LEFT JOIN spl.school s2 ON s2.school_id = s.school_id
        LEFT JOIN spl.spell_implement si ON si.spell_id = s.spell_id 
        JOIN gre.grimoire_spell gs ON gs.spell_id = s.spell_id 
        WHERE gs.grimoire_id = $1
          AND gs.user_id = $2
        GROUP BY 
          s.spell_id,
          s.circle,
          s."name",
          e.execution_id,
          r.range_id,
          s.target,
          d.duration_id,
          r2.resistance_id,
          a.area_id,
          t.type_id,
          s2.school_id,
          gs."prepared"
        ORDER BY s.circle, s."name", s2."name";`;

      const params = [grimoireId, userId]
      const result = await pool.query(sql, params);
      return factory(result.rows, Spell);
    } catch (error) {
      logger.error(`Ocorreu um erro ao listar as magias no DB. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao listar as magias.");
    }
  }

  async list(
    limit = null,
    offset = null,
    filterTextMap = new Map(),
    filterIdMap = new Map(),
    filterBoolMap = new Map(),
    sortColumn = ['name', 'asc'],
    userId
  ) {
    try {
      const grimoireId = filterIdMap.get("grimoireId") || null;

      let sql = 
        `WITH spells AS (
          SELECT
            s.spell_id,
            s.circle,
            s."name",
            e.execution_id,
            e."name" execution,
            r.range_id,
            r."name" "range",
            s.target,
            d.duration_id,
            d."name" duration,
            r2.resistance_id,
            r2."name" resistance,
            a.area_id,
            a."name" area,
            t.type_id,
            t."name" "type",
            s.description,
            s2.school_id,
            s2."name" school,
            ARRAY_AGG(
              jsonb_build_object(
                'cost', si."cost",
                'description', si.description 
              ) 
            ) implements
          ${grimoireId ? " , gs.prepared" : ""}
          FROM spl.spell s
          LEFT JOIN spl.execution e ON e.execution_id = s.execution_id
          LEFT JOIN spl."range" r ON r.range_id = s.range_id 
          LEFT JOIN spl.duration d ON d.duration_id = s.duration_id 
          LEFT JOIN spl.resistance r2 ON r2.resistance_id = s.resistance_id 
          LEFT JOIN spl.area a ON a.area_id = s.area_id 
          LEFT JOIN spl."type" t ON t.type_id = s.type_id 
          LEFT JOIN spl.school s2 ON s2.school_id = s.school_id
          LEFT JOIN spl.spell_implement si ON si.spell_id = s.spell_id 
          $replaceJoinGrimoire
          GROUP BY 
            s.spell_id,
            s.circle,
            s."name",
            e.execution_id,
            r.range_id,
            s.target,
            d.duration_id,
            r2.resistance_id,
            a.area_id,
            t.type_id,
            s2.school_id
            ${grimoireId ? " , gs.prepared" : ""}
          ORDER BY s.circle, s."name", s2."name"
        )
        SELECT * 
        FROM spells
        WHERE 1=1 $replaceFilterText $replaceFilterId $replaceFilterBool
        ORDER BY $replaceOrderColumn;`;

      const keywords = filterTextMap.get("keywords") || null;

      if (keywords) {
        const splitedKeywords = keywords.split(";");
        sql = sql.replace("$replaceFilterText", ` AND (UPPER(name::varchar) LIKE ANY (ARRAY[${splitedKeywords.map((el) => `UPPER('%${el}%')`)}]) OR UPPER(description::varchar) LIKE ANY (ARRAY[${splitedKeywords.map((el) => `UPPER('%${el}%')`)}])) `);
        filterTextMap.delete("keywords");
      }
      
      if (grimoireId) {
        sql = sql.replace(
          "$replaceJoinGrimoire", 
          ` JOIN gre.grimoire g ON g.grimoire_id = ${grimoireId}
          JOIN gre.grimoire_spell gs ON gs.grimoire_id = g.grimoire_id AND gs.spell_id = s.spell_id `
        );
        filterIdMap.delete("grimoireId");
      } else {
        sql = sql.replace("$replaceJoinGrimoire", "");
      }

      let customQuery = new PrepareSql().prepareCustomQuery(
        sql,
        filterTextMap,
        filterIdMap,
        filterBoolMap,
        sortColumn,
        limit,
        offset
      );
  
      const result = await pool.query(customQuery.stringSql, customQuery.paramValues);
      const spells = factory(result.rows, Spell);
      return { spells, totalRows: result.rowCount };
    } catch (error) {
      logger.error(`Ocorreu um erro ao listar os magias no DB. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao listar os magias.");
    }
  }

  // /**
  //  * 
  //  * @param {Spell} spellDto 
  //  * @returns {Promise<Spell>}
  //  */
  // async createSpell(spellDto) {
  //   try {
  //     const sql = 
  //       ``;

  //     const params = [];
  //     const result = await pool.query(sql, params);
  //     return result.rowCount > 0 ? (factory(result.rows, Spell))[0] : null;
  //   } catch (error) {
  //     logger.error(`Ocorreu um erro ao inserir o magia no DB. ${whereAndStackError(__filename, error)}`);
  //     throw new Error("Ocorreu um erro ao tentar criar o magia.");
  //   }
  // }

  // /**
  //  * 
  //  * @param {Spell} spellDto 
  //  * @returns {Promise<Spell>}
  //  */
  // async updateSpell(spellDto) {
  //   try {
  //     const sql = 
  //       ``;

  //     const params = [];
  //     const result = await pool.query(sql, params);
  //     return result.rowCount > 0 ? (factory(result.rows, Spell))[0] : null;
  //   } catch (error) {
  //     logger.error(`Ocorreu um erro ao atualizar o magia no DB. ${whereAndStackError(__filename, error)}`);
  //     throw new Error("Ocorreu um erro ao tentar atualizar o magia.");
  //   }
  // }
}

module.exports = SpellRepository;
