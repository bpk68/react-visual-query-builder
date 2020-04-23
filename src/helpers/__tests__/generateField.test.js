import generateField from '../generateField';

const expectedReturnObj = {
    label: '',
    name: '',
    dataType: '',
    type: ''
};

it('returns a field object', () => {
    expect(generateField()).toEqual(expectedReturnObj);
});

it('populates part of the return object using data passed in', () => {
    const populatedObj = {
        ...expectedReturnObj,
        name: 'hello',
        type: 'type'
    };

    expect(generateField(populatedObj)).toEqual(populatedObj);
});