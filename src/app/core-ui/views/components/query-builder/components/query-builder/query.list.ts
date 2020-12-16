export const queryList = {
  analyzed: {
    string: [
      'match_phrase',
      'match_phrase_prefix',
      'wildcard'
      // 'match',
      // 'term',
      // 'terms',
      // 'exists',
      // 'missing',
      // 'multi_match',
      // 'query_string',
      // 'prefix',
      // 'wildcard',
      // 'regexp',
      // 'fuzzy',
      // 'simple_query_string',
      // 'ids',
      // 'common',
      // 'span_term',
      // 'span_first'
    ],
    numeric: [
      'match',
      'gt',
      'lt',
      'gte',
      'lte',
      'range',
      'in_range_of_days'
      // 'exists',
      // 'missing',
      // 'ids',
      // 'common'
    ],
    geo_point: [
      'geo_distance',
      'geo_distance_range',
      'geo_bounding_box',
      'geo_polygon',
      'geohash_cell'
    ],
    geo_shape: [
      'geo_shape'
    ],
    date: [
      'match',
      'range',
      'gt',
      'lt',
      'gte',
      'lte',
      'in_range_of_days'
    ]
  },
  boolQuery: [
    'must',
    'should',
    'must_not',
    // 'filter'
  ],
  allowedDataTypes: [
    'string',
    'date',
    'number',
    'geo_point',
    'geo_shape'
  ]
};

export const queryListOperators = {
  match_phrase: 'Equals to',
  match: 'Equals to',
  match_phrase_prefix: 'Begins with',
  gt: '>',
  lt: '<',
  gte: '>=',
  lte: '<=',
  in_range_of_days: 'In range of days',
  range: 'Range',
  wildcard: 'Wildcard'
}

export const boolConditionName = {
  must: 'AND',
  must_not: 'NOT',
  should: 'OR'
}
