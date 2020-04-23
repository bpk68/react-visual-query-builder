import generateRuleGroup from '../generateRuleGroup';

const expectedReturnObj = {
    id: '',
    rules: [],
    combinator: '',
    not: false
};

it('returns a field object', () => {
    expect(generateRuleGroup().rules).toEqual(expectedReturnObj.rules);
});

it('populates part of the return object using data passed in', () => {
    const populatedObj = {
        ...expectedReturnObj,
        id: '123-abc',
        rules: [1, 2, 3]
    };

    expect(generateRuleGroup(populatedObj)).toEqual(populatedObj);
});