import React from 'react';
import { shallow, mount } from 'enzyme';

import { render, fireEvent, cleanup } from '@testing-library/react';

import AutoComplete from '../fields/AutoComplete';

it('renders without crashing', () => {
    shallow(<AutoComplete />);
});

describe('when rendering with props', () => {

    it('shows the correct value if set via props', () => {
        const props = {
            value: 'one',
            data: [
                { name: 'one', value: 'one' },
                { name: 'two', value: 'two' },
                { name: 'three', value: 'three' },
            ]
        };

        const wrapper = mount(<AutoComplete {...props} />);
        const element = wrapper.find('input.input-search');
        const listItems = wrapper.find('li');

        expect(element).toExist();
        expect(element).toHaveProp('value', props.value);
        expect(listItems.length).toBe(props.data.length);
    });
});

describe('when handling events', () => {

    let wrapper,
        instance;

    const props = {
        value: '',
        onValueChange: jest.fn(),
        data: [
            { name: 'one', value: 'one' },
            { name: 'two', value: 'two' },
            { name: 'three', value: 'three' },
        ]
    };

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = mount(<AutoComplete {...props} />);
        instance = wrapper.instance();
    });

    it('doesn\'t call the props onValueChange event if not supplied', () => {
        const newProps = {
            ...props,
            onValueChange: null
        };
        wrapper = mount(<AutoComplete {...newProps} />);

        const element = wrapper.find('li').first();

        expect(element).toExist();

        element.simulate('click');

        expect(props.onValueChange).not.toHaveBeenCalled();
    });

    it('calls the props onValueChange event when input is changed', () => {
        const element = wrapper.find('li').first();

        expect(element).toExist();

        element.simulate('click');

        expect(props.onValueChange).toHaveBeenCalled();
    });
});

describe('when handling errors', () => {

    let wrapper,
        instance;

    const props = {
        value: 'onebigvalue',
        onValueChange: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = mount(<AutoComplete {...props} />);
        instance = wrapper.instance();
    });

    afterEach(cleanup);

    it('shows the correct inputs when searching occurs', () => {
        const { getByTestId } = render(<AutoComplete {...props} />);
        const element = getByTestId('inputAutoCompleteOne');
        const results = getByTestId('divAutoCompleteResults');

        expect(element).toHaveClass('is-active');
        expect(results).not.toHaveClass('is-active');

        fireEvent.focus(element);

        expect(element).not.toHaveClass('is-active');
        expect(results).toHaveClass('is-active');
    });
});