import generateRuleGroup from '../generateRuleGroup';
import generateSimpleQuery from '../generateSimpleQuery';

const expectedReturnObj = {
    id: '',
    rules: [generateRuleGroup()],
    target: { type: '', value: '' }
};

it('returns a field object', () => {
    expect(generateSimpleQuery().target).toEqual(expectedReturnObj.target);
});

it('populates part of the return object using data passed in', () => {
    const populatedObj = {
        ...expectedReturnObj,
        id: '123-abc',
        rules: [1, 2, 3]
    };

    expect(generateSimpleQuery(populatedObj)).toEqual(populatedObj);
});