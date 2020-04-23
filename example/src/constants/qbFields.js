import { FIELD_TYPES, OPERATORS, COMBINATORS, DATA_TYPES } from '../../../src/index';

export const simpleFields = {
    combinators: [
        COMBINATORS.AND,
        COMBINATORS.OR
    ],
    fields: [
        {
            label: 'Users',
            name: 'users',
            dataType: DATA_TYPES.STRING,
            type: FIELD_TYPES.AUTOCOMPLETE_LIST,
            operators: [
                OPERATORS.IS,
                OPERATORS.IS_NOT
            ],
            data: [
                {
                    name: 'Abraham Lincoln',
                    value: 123
                },
                {
                    name: 'Jonny Johnson',
                    value: 345
                },
                {
                    name: 'Mr Black',
                    value: 99
                },
                {
                    name: 'Davide Testington',
                    value: 352
                },
                {
                    name: 'Alexis Smith',
                    value: 3
                },
                {
                    name: 'Holly Willohby',
                    value: 69
                },
                {
                    name: 'Walter White',
                    value: 991
                },
                {
                    name: 'Walt Whitman',
                    value: 993
                },
                {
                    name: 'Waltz A Doltz',
                    value: 992
                },
                {
                    name: 'Frank Castle',
                    value: 322
                },
                {
                    name: 'Jamie Lee Curtis',
                    value: 781
                }
            ]
        },
        {
            label: 'First Name',
            name: 'firstName',
            dataType: DATA_TYPES.STRING,
            type: FIELD_TYPES.TEXT,
        },
        {
            label: 'Contract Date',
            name: 'contractDate',
            dataType: DATA_TYPES.DATE_TIME,
            type: FIELD_TYPES.DATE,
        },
        {
            label: 'Number of users',
            name: 'numUsers',
            dataType: DATA_TYPES.NUMBER,
            type: FIELD_TYPES.NUMBER,
        },
        {
            label: 'User activation status',
            name: 'useractive',
            dataType: DATA_TYPES.TRUE_FALSE,
            type: FIELD_TYPES.TOGGLE,
        },
        {
            label: 'Number of licences',
            name: 'numLicences',
            dataType: DATA_TYPES.NUMBER,
            type: FIELD_TYPES.SLIDER,
            range: {
                min: 0,
                max: 100
            }
        }
    ]
};