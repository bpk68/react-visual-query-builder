import React from 'react';
import { shallow, mount } from 'enzyme';

import { render, fireEvent, cleanup } from '@testing-library/react';

import Rule from '../Rule';
import DATA_TYPES from '../../constants/dataTypes';
import FIELD_TYPES from '../../constants/fieldTypes';
import generateRule from '../../helpers/generateRule';


const initialProps = Object.freeze({
    fields: [
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
            operators: ['in', 'null', 'between']
        },
        {
            label: 'User activation status',
            name: 'useractive',
            dataType: DATA_TYPES.TRUE_FALSE,
            type: FIELD_TYPES.TOGGLE,
        },
    ],
    rule: generateRule(),
    onRemoveRule: jest.fn(),
    onRuleChange: jest.fn()
});

it('renders without crashing', () => {
    shallow(<Rule />);
});

describe('when rendering with props', () => {

    it('shows the correct value if set via props', () => {
        const wrapper = mount(<Rule {...initialProps} />);
        const elements = wrapper.find('select');
        const btnDelete = wrapper.find('button.is-danger');

        expect(elements).toExist();
        expect(elements.length).toBe(2);
        expect(btnDelete).toExist();
        // The +1 here accounts for the __default option being injected to the select list
        expect(elements.first().find('option').length).toBe(initialProps.fields.length + 1);
    });
});

describe('when handling events', () => {

    let wrapper;

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = mount(<Rule {...initialProps} />);
    });

    it('doesn\'t call the props onRuleChange event if not supplied', () => {
        const newProps = {
            ...initialProps,
            onRuleChange: null
        };
        wrapper = mount(<Rule {...newProps} />);

        const element = wrapper.find('button.is-danger');

        expect(element).toExist();

        element.simulate('click');

        expect(initialProps.onRuleChange).toHaveBeenCalledTimes(0);
    });


    it('handles the delete rule event and fires onRuleChange', () => {
        const element = wrapper.find('button.is-danger');

        expect(element).toExist();

        element.simulate('click');

        expect(initialProps.onRemoveRule).toHaveBeenCalled();
        expect(initialProps.onRemoveRule).toHaveBeenCalledWith(initialProps.rule.id);
    });

    it('updates the operators select list when the field select is changed', () => {
        const elements = wrapper.find('select');

        expect(elements).toExist();
        expect(elements.length).toBe(2);
        expect(elements.last().find('option').length).toBe(1);

        elements.first().simulate('change', { target: { value: initialProps.fields[2].name } });

        // Need to find the updated elements
        const updatedElements = wrapper.find('select');

        // The +1 here accounts for the __default option being injected to the select list
        expect(updatedElements.last().find('option').length).toBe(initialProps.fields[2].operators.length + 1);
        expect(initialProps.onRuleChange).toHaveBeenCalled();
    });

    it('changes the field type when the field select is changed', () => {
        const elements = wrapper.find('select');
        let currentField = wrapper.find('input[type="text"]');
        let numberField = wrapper.find('input[type="number"]');

        expect(elements).toExist();
        expect(elements.length).toBe(2);
        expect(currentField).toExist();
        expect(numberField).not.toExist();

        elements.first().simulate('change', { target: { value: initialProps.fields[2].name } });

        currentField = wrapper.find('input[type="text"]');
        numberField = wrapper.find('input[type="number"]');
        expect(currentField).not.toExist();
        expect(numberField).toExist();
    });
});