import {
    isNullOrEmpty,
    findRuleOrGroup,
    getFieldValue
} from '../utils';


describe('when testing null or empty check utilities', () => {

    it('returns true when value is null or empty', () => {
        const test1 = isNullOrEmpty();
        const test2 = isNullOrEmpty([]);
        const test3 = isNullOrEmpty('');
        const test4 = isNullOrEmpty(null);

        expect(test1).toBeTruthy();
        expect(test2).toBeTruthy();
        expect(test3).toBeTruthy();
        expect(test4).toBeTruthy();
    });

    it('returns false when value is not null or empty', () => {
        const test1 = isNullOrEmpty('hello');
        const test2 = isNullOrEmpty([0, 2, 1]);
        const test3 = isNullOrEmpty(true);
        const test4 = isNullOrEmpty({ greeting: 'hello' });

        expect(test1).toBeFalsy();
        expect(test2).toBeFalsy();
        expect(test3).toBeFalsy();
        expect(test4).toBeFalsy();
    });
});

describe('when testing rule group finding', () => {

    it('correctly discovers and returns the right rule or group', () => {
        const needle = {
            id: '123',
            rules: []
        };
        const haystack = {
            id: '567',
            rules: [
                {
                    id: '098',
                },
                {
                    id: '198',
                },
                {
                    id: '298',
                },
                {
                    id: '398',
                    rules: [
                        {
                            id: '598',
                        },
                        {
                            id: '698',
                        },
                        {
                            id: '798',
                        },
                        {
                            id: '898',
                            rules: [
                                {
                                    id: '998',
                                },
                                {
                                    id: '1098',
                                },
                                {
                                    ...needle
                                }
                            ]
                        }
                    ]
                },
                {
                    id: '498',
                }
            ]
        };

        const match = findRuleOrGroup(needle.id, haystack);

        expect(match).not.toBeNull();
        expect(match).toEqual(needle);
    });
});

describe('when testing field value returning', () => {

    it('returns an empty string if the field is empty', () => {
        expect(getFieldValue()).toBe('');
    });

    it('returns an array when the value is a joined string', () => {
        const field = 'value one|value two|third value|fourth';
        expect(getFieldValue(field).length).toBe(4);
    });
});