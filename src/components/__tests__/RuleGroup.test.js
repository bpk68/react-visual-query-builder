import React from 'react';
import { shallow, mount } from 'enzyme';

import RuleGroup from '../RuleGroup';
import DATA_TYPES from '../../constants/dataTypes';
import FIELD_TYPES from '../../constants/fieldTypes';
import generateRuleGroup from '../../helpers/generateRuleGroup';


const initialProps = Object.freeze({
    parentGroupId: 'g-abc-123-yui',
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
        },
        {
            label: 'User activation status',
            name: 'useractive',
            dataType: DATA_TYPES.TRUE_FALSE,
            type: FIELD_TYPES.TOGGLE,
        },
    ],
    ruleGroup: generateRuleGroup(),
    combinators: ['and', 'or'],
    onRuleGroupChange: jest.fn(),
    onRemoveRuleGroup: jest.fn(),
    showRemoveButton: false,
});

it('renders without crashing', () => {
    shallow(<RuleGroup />);
});

describe('when rendering with props', () => {

    let wrapper;

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = mount(<RuleGroup {...initialProps} />);
    });

    it('shows the correct value if set via props', () => {
        const elements = wrapper.find('button.is-primary');
        const ruleGroup = wrapper.find('div#' + initialProps.ruleGroup.id + '');

        expect(elements).toExist();
        expect(elements.length).toBe(2);
        expect(ruleGroup).toExist();
    });

    it('does not show the remove group button if flag set to false', () => {
        const btnDelete = wrapper.find('button.is-danger');

        expect(btnDelete).not.toExist();
    });
});

describe('when handling events', () => {

    let wrapper;

    beforeEach(() => {
        jest.clearAllMocks();
        initialProps.onRuleGroupChange.mockClear();

        wrapper = mount(<RuleGroup {...initialProps} />);
    });

    it('doesn\'t call the props onRuleGroupChange event if not supplied', () => {
        initialProps.onRuleGroupChange.mockClear();
        const newProps = {
            ...initialProps,
            onRuleGroupChange: null
        };
        wrapper = mount(<RuleGroup {...newProps} />);

        const element = wrapper.find('button.is-primary').first();

        expect(element).toExist();

        element.simulate('click');

        expect(initialProps.onRuleGroupChange).toHaveBeenCalledTimes(0);
    });

    it('handles the combinator change event and fires onRuleGroupChange', () => {
        const element = wrapper.find('select').first();
        const updatedGroup = {
            ...initialProps.ruleGroup,
            combinator: initialProps.combinators[0]
        };

        expect(element).toExist();

        element.simulate('change', { target: { value: initialProps.combinators[0] } });

        expect(initialProps.onRuleGroupChange).toHaveBeenCalled();
        expect(initialProps.onRuleGroupChange).toHaveBeenCalledWith(updatedGroup);
    });

    it('handles the add rule event and fires onRuleGroupChange', () => {
        const element = wrapper.find('button.is-primary').first();

        expect(element).toExist();

        element.simulate('click');

        expect(initialProps.onRuleGroupChange).toHaveBeenCalled();
        expect(initialProps.onRuleGroupChange.mock.calls[1][0].rules.length).toBeGreaterThan(0);
    });

    it('handles the add rule group event and fires onRuleGroupChange', () => {
        const element = wrapper.find('button.is-primary').last();

        expect(element).toExist();

        element.simulate('click');

        expect(initialProps.onRuleGroupChange).toHaveBeenCalled();
        expect(initialProps.onRuleGroupChange.mock.calls[1][0].rules[0].id).toContain('g-');
    });

    it('handles the delete rule group event and fires onRuleGroupChange', () => {
        const props = {
            ...initialProps,
            showRemoveButton: true
        };
        wrapper = mount(<RuleGroup {...props} />);
        const element = wrapper.find('button.is-danger').last();

        expect(element).toExist();

        element.simulate('click');

        expect(initialProps.onRemoveRuleGroup).toHaveBeenCalled();
    });
});