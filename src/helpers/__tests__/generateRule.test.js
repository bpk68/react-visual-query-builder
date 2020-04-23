import generateRule from '../generateRule';

const expectedReturnObj = {
    id: '',
    field: '',
    value: '',
    operator: ''
};

it('returns a field object', () => {
    expect(generateRule().field).toEqual(expectedReturnObj.field);
});

it('populates part of the return object using data passed in', () => {
    const populatedObj = {
        ...expectedReturnObj,
        id: '123-abc',
        operator: 'and'
    };

    expect(generateRule(populatedObj)).toEqual(populatedObj);
});