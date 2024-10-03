const areAllIntegers = require("./are-all-integers");
const { toLogico } = require("./parser");
const SnakerCamelSwitcher = require("./snaker-camel-switcher");

class PrepareSql {

  /**
   * 
   * @param {Array<string>} filterStringOptions 
   * @param {Map} filterStringMap 
   * @param {Array<string>} filterIdOptions 
   * @param {Map} filterIdMap 
   * @param {Array<string>} filterBoolOptions 
   * @param {Map} filterBoolMap 
   * @param {Array<string>} filterArrayOptions 
   * @param {Map} filterArrayMap 
   * @param {Request} req 
   */
  initFilters(
    filterStringOptions,
    filterStringMap,
    filterIdOptions,
    filterIdMap,
    filterBoolOptions,
    filterBoolMap,
    req,
    filterArrayOptions = [],
    filterArrayMap = new Map(),
  ) {
    for (const [key, value] of Object.entries(req.query)) {
      if (filterStringOptions.includes(key)) {
        filterStringMap.set(key, value);
      }

      if (filterIdOptions.includes(key)) {
        filterIdMap.set(key, value);
      }

      if (filterBoolOptions.includes(key)) {
        filterBoolMap.set(key, value);
      }

      if (filterArrayOptions.includes(key)) {
        filterArrayMap.set(key, value.split(","));
      }
    }
  }

  /**
   * 
   * @param {string} sql 
   * @param {Map} filterTextMap 
   * @param {Map} filterIdMap 
   * @param {Map} filterBoolMap 
   * @param {Array<string, string>} sortColumn 
   * @param {integer} limit 
   * @param {integer} offset 
   * @param {Map} filterArrayMap 
   * @returns {{ stringSql: string, paramValues: Array<any> }}
   */
  prepareCustomQuery(
    sql,
    filterTextMap,
    filterIdMap,
    filterBoolMap,
    sortColumn,
    limit,
    offset,
    filterArrayMap = new Map(),
  ) {
    let customQuery = { stringSql: '', paramValues: [] };
    customQuery.stringSql = sql;

    customQuery = this.addFilterTextToSql(customQuery, filterTextMap);
    customQuery = this.addFilterIdToSql(customQuery, filterIdMap);
    customQuery = this.addFilterBoolToSql(customQuery, filterBoolMap);
    customQuery = this.addOrderParamToSql(customQuery, sortColumn);
    customQuery = this.addFilterArrayToSql(customQuery, filterArrayMap);
    
    customQuery.stringSql = customQuery.stringSql.replace('$replaceLimitIndex', `$${customQuery.paramValues.length + 1}`);
    customQuery.stringSql = customQuery.stringSql.replace('$replaceOffsetIndex', `$${customQuery.paramValues.length + 2}`);

    customQuery.paramValues.push(limit);
    customQuery.paramValues.push(offset);

    return customQuery;
  }

  addFilterTextToSql(customQuery, filterMap) {
  
    let filterText = "";
    if (filterMap.size > 0)
    filterText += " AND ";
    
    filterMap.forEach(function (value, key) {
      let normalizedParam = SnakerCamelSwitcher.camelToSnakeString(key);
      customQuery.paramValues.push("%" + value.toUpperCase() + "%");
      filterText += `upper(${normalizedParam}::varchar) like $${customQuery.paramValues.length}`;
      if (customQuery.paramValues.length < filterMap.size) filterText += " AND ";
    });
    
    customQuery.stringSql = customQuery.stringSql.replace('$replaceFilterText', `${filterText}`);
    return customQuery;
  
  }
  
  addFilterIdToSql(customQuery, filterMap) {
    let filterId = "";
    if (filterMap.size > 0)
      filterId += " AND ";
      
      filterMap.forEach(function (value, key) {
        if (value.includes(",")) {
          value = value.split(",");
        }
        let normalizedParam = SnakerCamelSwitcher.camelToSnakeString(key);
        customQuery.paramValues.push(value);

        if (Array.isArray(value)) {
          filterId += `${normalizedParam} IN ($${customQuery.paramValues.length})`;
        } else {
          filterId += `${normalizedParam} = $${customQuery.paramValues.length}`;
        }

        if (customQuery.paramValues.length <= filterMap.size) {
          filterId += " AND ";
        }
      });
      
    filterId = (filterId.substring(filterId.length - 4) == 'AND ') ? filterId.substring(0, filterId.length-4): filterId;
  
    customQuery.stringSql = customQuery.stringSql.replace('$replaceFilterId', `${filterId}`);
    return customQuery;
  }

  addFilterBoolToSql(customQuery, filterMap) {
    let filterId = "";
    if (filterMap.size > 0)
      filterId += " AND ";
      
      filterMap.forEach(function (value, key) {
        value = toLogico(value);
        
        let normalizedParam = SnakerCamelSwitcher.camelToSnakeString(key);
        customQuery.paramValues.push(value);
        filterId += `${normalizedParam} = $${customQuery.paramValues.length}`;
        if (customQuery.paramValues.length <= filterMap.size) {
          filterId += " AND ";
        }
      });
      
    filterId = (filterId.substring(filterId.length - 4) == 'AND ') ? filterId.substring(0, filterId.length-4): filterId;
  
    customQuery.stringSql = customQuery.stringSql.replace('$replaceFilterBool', `${filterId}`);
    return customQuery;
  }
  
  addOrderParamToSql(customQuery, orderColumn) {
    let normalizedParam = "";
    if (orderColumn && Array.isArray(orderColumn) && orderColumn.length > 0) {
      normalizedParam = orderColumn[0];
  
      if (!Number.isInteger(orderColumn[0])) {
        normalizedParam = SnakerCamelSwitcher.camelToSnakeString(orderColumn[0]);
      }
  
      customQuery.stringSql = customQuery.stringSql.replace('$replaceOrderColumn', `${normalizedParam} ${orderColumn[1]}`);
    } else {
      customQuery.stringSql = customQuery.stringSql.replace('$replaceOrderColumn', `${normalizedParam}`);
    }
    return customQuery;
  }

  addFilterArrayToSql(customQuery, filterMap) {
    let filterId = "";

    if (filterMap.size > 0) {
      filterId += " AND ";

      filterMap.forEach(function (value, key) {
        let normalizedParam = SnakerCamelSwitcher.camelToSnakeString(key);
        
        if (areAllIntegers(value)) {
          customQuery.paramValues.push(value);
          filterId += `${normalizedParam} @> ARRAY[$${customQuery.paramValues.length}]::integer[]`;
        } else {
          customQuery.paramValues.push(`%${value}%`);
          filterId += 
            `EXISTS (
              SELECT 1
              FROM unnest(${normalizedParam}) AS value
              WHERE value ILIKE $${customQuery.paramValues.length}
            )`;
        }
      });

      filterId = (filterId.substring(filterId.length - 4) == 'AND ') ? filterId.substring(0, filterId.length-4): filterId;
    }

    customQuery.stringSql = customQuery.stringSql.replace('$replaceFilterArray', `${filterId}`);
    return customQuery;
  }
}

module.exports = PrepareSql;
