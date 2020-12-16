import * as moment from 'moment';
import { queryList, queryListOperators, boolConditionName } from "./components/query-builder/query.list";
import { QueryBuilderConfig } from "./components/query-builder";

export interface MappingType {
  properties: any;
}

export const getESBool = (data: any, config: any) => {
  if (!data.rules || data.rules.length === 0) {
    if (!data.condition) {
      return (data.query = {
        match_all: {}
      });
    }

    return (data.query = {
      "*": {
        "*": ""
      }
    });
  }

  return (function parse(data) {
    if (!data.rules || data.rules.length === 0) {
      return {};
    }

    const parts: any = {};

    parts.add = function(k, v) {
      if (this.hasOwnProperty(k)) {
        this[k].push(v);
      } else {
        this[k] = [v];
      }
    };

    data.rules.forEach(function(rule: any) {
      function make_query(rule) {
        if (!rule.field || !config.fields[rule.field].type) return {};
        const type = config.fields[rule.field].type;
        const mdb = queryList.analyzed[type].find(v => v === rule.operator),
          part = {};

        if (mdb === undefined) {
          throw new Error(
            'Unknown elasticsearch operation for operator "{0}"'.replace(
              "{0}",
              rule.operator
            )
          );
        }

        const es_key_val = {};
        let { operator, value } = rule;
        switch (operator) {
          case 'gt':
          case 'lt':
          case 'gte':
          case 'lte':
            operator = 'range';
            es_key_val[rule.field] = value;
            break;
          case 'in_range_of_days':
            operator = 'range';
            es_key_val[rule.field] = {
              "gte": `now-${value.lt}d/d`
            }
            break;
          default:
            es_key_val[rule.field] = value;
            break;
        }

        part[operator] = formatValue(type, rule.field, es_key_val);

        return part;
      }

      const clause = data.condition;

      if (rule.rules && rule.rules.length > 0) {
        parts.add(clause, parse(rule));
      } else {
        parts.add(clause, make_query(rule));
      }
    });

    delete parts.add;

    if (parts.length === 1) {
      return {
        match: parts
      };
    }

    const result = {
      bool: parts
    };

    if (data.minimum_should_match) {
      result["minimum_should_match"] = data.minimum_should_match;
    }

    return result;
  })(data);
};


export const getOperator = (operatorName) => {
	if (queryListOperators[operatorName]) {
		return queryListOperators[operatorName];
	}

	return operatorName;
}

export const parseQueryToConditions = (query: any) => {
  function searchCondition(conditionValue, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].condition === conditionValue) {
        return myArray[i];
      }
    }
  }

  const parts = [];
  const config = {
    fields: {}
  };

  return (function parseCondition(queryBlock, parts) {
    queryBlock.forEach(function(block) {
      if (block.bool) {
        const condition = Object.keys(block.bool)[0];
        const minShouldMatch = block.bool["minimum_should_match"];
        const found = searchCondition(condition, parts);

        if (!found) {
          parts.push({
            condition: condition,
            minimum_should_match: minShouldMatch || "",
            rules: []
          });
        }

        parseCondition(block.bool[condition], parts[parts.length - 1].rules);
      } else {
        const operator = Object.keys(block)[0];
        const field = Object.keys(block[operator])[0];
        const value = block[operator][field];

        if (parts) {
          parts.push({
            field,
            operator,
            value
          });
        }

        config.fields[field] = {
          name: field.charAt(0).toUpperCase() + field.slice(1),
          // type: typeof value === "string" ? "string" : "number"
          type: value
        };
      }
    });

    return {
      query: parts[0] || [],
      config
    };
  })([query], parts);
};

export const getConfigFromMapping = (mappings: MappingType) => {
  if (!mappings || !mappings.properties) return { fields: {} };

  const fieldKeys = Object.keys(mappings.properties);
  const config: QueryBuilderConfig = {
    fields: {}
  };

  fieldKeys.forEach(key => {
    const name = key
      .toLocaleLowerCase()
      .replace(/(^|_)(\w)/g, s => s.toUpperCase().replace("_", " "));

    config.fields[key] = {
      name,
      type: parseDataType(mappings.properties[key].type)
    };
  });

  return config;
};


function parseDataType(elsType: string) {
  // Numeric
  const numbers = ['long', 'float'];

  if (numbers.indexOf(elsType) !== -1) return 'numeric';

  if (elsType === 'date') return 'date';

  return 'string';
}

function formatValue(type: string, fieldName: string, value: any) {
  if (type === 'date' && value && Date.parse(value[fieldName])) {
    const newVal = {};
    newVal[fieldName] = moment(value[fieldName]).format('YYYY-MM-DD');

    return newVal;
  }

  return value;
}
