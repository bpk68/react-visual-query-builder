import DATA_TYPES from './dataTypes';

const OPERATORS = {
    IN: 'in',
    NOT_IN: 'not in',
    IS: 'is',
    IS_NOT: 'is not',
    IS_NULL: 'null',
    IS_NOT_NULL: 'is not null',
    EQUALS: '=',
    NOT_EQUALS: '!=',
    LESS_THAN: '<',
    LESS_THAN_OR_EQUAL: '<=',
    GREATER_THAN: '>',
    GREATER_THAN_OR_EQUAL: '>=',
    CONTAINS: 'contains',
    BEGINS_WITH: 'begins with',
    ENDS_WITH: 'ends with',
    DOES_NOT_CONTAIN: 'does not contain',
    DOES_NOT_BEGIN_WITH: 'does not begin with',
    DOES_NOT_END_WITH: 'does not end with',
    LIKE: 'like',
    NOT_LIKE: 'not like',
    BEFORE: 'before',
    AFTER: 'after',
    ON: 'on',
    IS_PRESENT: 'is present',
    IS_NOT_PRESENT: 'is not present',
    DATE_TIME: 'date time',
    BETWEEN: 'between',
    PLUS_MINUS_DAYS: 'plus / minus days',
};

export const DATA_TYPE_OPERATORS = {
    DEFAULT: [
        OPERATORS.EQUALS,
        OPERATORS.LESS_THAN,
        OPERATORS.LESS_THAN_OR_EQUAL,
        OPERATORS.GREATER_THAN,
        OPERATORS.GREATER_THAN_OR_EQUAL,
        OPERATORS.EQUALS,
        OPERATORS.NOT_EQUALS,
        OPERATORS.CONTAINS,
        OPERATORS.DOES_NOT_CONTAIN,
        OPERATORS.BEGINS_WITH,
        OPERATORS.DOES_NOT_BEGIN_WITH,
        OPERATORS.ENDS_WITH,
        OPERATORS.DOES_NOT_END_WITH
    ],
    [DATA_TYPES.NUMBER]: [
        OPERATORS.EQUALS,
        OPERATORS.LESS_THAN,
        OPERATORS.LESS_THAN_OR_EQUAL,
        OPERATORS.GREATER_THAN,
        OPERATORS.GREATER_THAN_OR_EQUAL
    ],
    [DATA_TYPES.STRING]: [
        OPERATORS.EQUALS,
        OPERATORS.NOT_EQUALS,
        OPERATORS.CONTAINS,
        OPERATORS.DOES_NOT_CONTAIN,
        OPERATORS.BEGINS_WITH,
        OPERATORS.DOES_NOT_BEGIN_WITH,
        OPERATORS.ENDS_WITH,
        OPERATORS.DOES_NOT_END_WITH
    ],
    [DATA_TYPES.TRUE_FALSE]: [
        OPERATORS.IS,
        OPERATORS.IS_NOT
    ],
    [DATA_TYPES.LIST]: [
        OPERATORS.IN,
        OPERATORS.NOT_IN
    ],
    [DATA_TYPES.DATE_TIME]: [
        OPERATORS.BEFORE,
        OPERATORS.AFTER,
        OPERATORS.ON,
        OPERATORS.IS_PRESENT,
        OPERATORS.IS_NOT_PRESENT,
        OPERATORS.DATE_TIME,
        OPERATORS.BETWEEN,
        OPERATORS.PLUS_MINUS_DAYS
    ]
};

export default OPERATORS;

