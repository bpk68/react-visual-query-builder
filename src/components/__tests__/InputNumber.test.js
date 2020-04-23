import React from 'react';
import { shallow, mount } from 'enzyme';

import { render, fireEvent, cleanup } from '@testing-library/react';

import InputNumber from '../fields/InputNumber';

it('renders without crashing', () => {
    shallow(<InputNumber />);
});

describe('when rendering with props', () => {

    it('shows the correct value if set via props', () => {
        const props = {
            value: 'this is a test'
        };

        const wrapper = mount(<InputNumber {...props} />);
        const element = wrapper.find('input.input');

        expect(element).toExist();
        expect(element).toHaveProp('value', props.value);
    });
});

describe('when handling events', () => {

    let wrapper,
        instance;

    const props = {
        value: '',
        onValueChange: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = mount(<InputNumber {...props} />);
        instance = wrapper.instance();
    });

    it('doesn\'t call the props onValueChange event if not supplied', () => {
        const newProps = {
            value: '',
        };
        wrapper = mount(<InputNumber {...newProps} />);

        const element = wrapper.find('input.input');

        expect(element).toExist();

        element.simulate('change');

        expect(props.onValueChange).not.toHaveBeenCalled();
    });

    it('calls the props onValueChange event when input is changed', () => {
        const element = wrapper.find('input.input');
        const value = '123';

        expect(element).toExist();

        element.simulate('change', { target: { value: value } });

        expect(props.onValueChange).toHaveBeenCalled();
        expect(props.onValueChange).toHaveBeenCalledWith(value);
    });
});

describe('when handling errors', () => {

    let wrapper,
        instance;

    const props = {
        value: '',
        onValueChange: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = mount(<InputNumber {...props} />);
        instance = wrapper.instance();
    });

    it('doesn\'t call the props onValueChange when there is an error', () => {
        const element = wrapper.find('input.input');

        expect(element).toExist();

        element.simulate('change', { target: { value: 'abcnotanumber' } });

        expect(props.onValueChange).not.toHaveBeenCalled();
    });

    afterEach(cleanup);

    it('sets an error CSS class when there is an error', () => {
        const newProps = {
            value: '123'
        };
        const { getByDisplayValue } = render(<InputNumber {...newProps} />);
        const element = getByDisplayValue(newProps.value);

        expect(element).not.toHaveClass('has-error');

        fireEvent.change(element, { target: { value: 'abcnotanumber' } });

        expect(element).toHaveClass('has-error');
    });
});