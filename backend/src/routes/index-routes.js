const router = require("express").Router();
const indexController = require("../controller/index-controller");
const pool = require("../database/pool");
const { spells } = require("./spells");

/* GET */
router.get("/info", indexController.info);

// router.get("/teste", async (req, res) => {
//   try {
//     for await (const spell of spells.spells) {
//       const sql = 
//         `UPDATE spl.spell
//         SET resistance_id = (SELECT r.resistance_id FROM spl.resistance r WHERE upper(r."name") = upper('${spell.resistance}'))
//         WHERE UPPER(spell.name) = UPPER('${spell.name}');`;

//         await pool.query(sql, []);
//     }

//     return res.status(200).send({msg: 'sql'});
//   } catch (error) {
//     return res.status(400).send({error: error.message});
//   }
// })

// router.get("/teste", async (req, res) => {
//   try {
//     let sql = `INSERT INTO spl.spell_implement (spell_id,"cost",description) VALUES $replaceValues`;

//     let aux = 172;
//     const values = spells.spells.map((spell) => {
//       aux++;
//       const implements = spell.implements;
//       const ret = implements.map((el) => `((SELECT s.spell_id FROM spl.spell s WHERE s.name = '${spell.name}'), '${el.cost}', '${el.description}')`)
//       return ret;
//     });
//     let values2 = [];

//     values.forEach(val => {
//       val.forEach((el) => {
//         values2.push(el);
//       });
//     })

//     sql = sql.replace('$replaceValues', values2.join(","));

//     await pool.query(sql, []);
//     return res.status(200).send({msg: 'sql'});
//   } catch (error) {
//     return res.status(400).send({error: error.message});
//   }
// })

// router.get("/teste", async (req, res) => {

//   try {
//     let sql = 
//       `INSERT INTO spl.spell (
//         circle,
//         "name",
//         execution_id,
//         range_id,
//         target,
//         duration_id,
//         resistance_id,
//         area_id,
//         type_id,
//         description,
//         school_id
//       ) VALUES $replaceValues`;
  
//       const values = spells.spells.map(spell => {
//         return `(${spell.circle}, '${spell.name}', ${defineExecution(spell.execution)}, ${defineRange(spell.range)}, '${spell.target}', ${defineDuration(spell.duration)}, ${defineResistance(spell.resistance)}, null, ${defineType(spell.type)}, '${spell.description}', ${defineSchool(spell.type)})`
//       });
  
//       sql = sql.replace("$replaceValues", values.join(","));
  
//       const result = await pool.query(sql, []);
  
//     return res.status(200).send({result: result.rows})
    
//   } catch (error) {
//     return res.status(400).send({erro: error.message})
//   }
// })

function defineExecution(execution) {
  let id = null;
  switch (execution) {
    case 'padrão':
      id = 4;
      break;
    case 'reação':
      id = 2
      break;
    case 'livre':
      id = 1;
      break;
    case 'movimento':
      id = 3;
      break;
    case 'completa':
      id = 5
      break;
  
    default:
      break;
  }

  return id;
}

function defineRange(range) {
  let id = null;
  switch (range) {
    case 'pessoal':
      id = 1;
      break;
    case 'toque':
      id = 2
      break;
    case 'curto':
      id = 3;
      break;
    case 'médio':
      id = 4;
      break;
    case 'longo':
      id = 5
      break;
  
    default:
      break;
  }

  return id;
}

function defineDuration(duration) {
  let id = null;
  switch (duration) {
    case 'instantânea':
      id = 1;
      break;
    case 'cena':
      id = 2
      break;
    case 'sustentada':
      id = 3;
      break;
    case 'permanente':
      id = 6;
      break;
  
    default:
      break;
  }

  return id;
}

function defineResistance(str) {
  const lowerCaseStr = str.toLowerCase();
  
  if (lowerCaseStr.includes("fortitude")) {
    return 1;
  } else if (lowerCaseStr.includes("reflexos")) {
    return 2;
  } else if (lowerCaseStr.includes("vontade")) {
    return 3;
  } else {
    return null;
  }
}

function defineType(str) {
  const lowerCaseStr = str.toLowerCase();
  
  if (lowerCaseStr.includes("arcana")) {
    return 1;
  } else if (lowerCaseStr.includes("divina")) {
    return 2;
  } else if (lowerCaseStr.includes("universal")) {
    return 3;
  } else {
    return null;
  }
}

function defineSchool(str) {
  const lowerCaseStr = str.toLowerCase();
  
  if (lowerCaseStr.includes("abjuração")) {
    return 1;
  } else if (lowerCaseStr.includes("adivinhação")) {
    return 2;
  } else if (lowerCaseStr.includes("convocação")) {
    return 3;
  } else if (lowerCaseStr.includes("encantamento")) {
    return 4;
  } else if (lowerCaseStr.includes("evocação")) {
    return 5;
  } else if (lowerCaseStr.includes("ilusão")) {
    return 6;
  } else if (lowerCaseStr.includes("necromancia")) {
    return 7;
  } else if (lowerCaseStr.includes("transmutação")) {
    return 8;
  } else {
    return null;
  }
}

module.exports = router;