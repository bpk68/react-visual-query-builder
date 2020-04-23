import React from 'react';
import { shallow, mount } from 'enzyme';

import Input from '../fields/Input';

it('renders without crashing', () => {
    shallow(<Input />);
});

describe('when rendering with props', () => {

    it('shows the correct value if set via props', () => {
        const props = {
            value: 'this is a test'
        };

        const wrapper = mount(<Input {...props} />);
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
        wrapper = mount(<Input {...props} />);
        instance = wrapper.instance();
    });

    it('doesn\'t call the props onValueChange event if not supplied', () => {
        const newProps = {
            value: '',
        };
        wrapper = mount(<Input {...newProps} />);

        const element = wrapper.find('input.input');

        expect(element).toExist();

        element.simulate('change');

        expect(props.onValueChange).not.toHaveBeenCalled();
    });

    it('calls the props onValueChange event when input is changed', () => {
        const element = wrapper.find('input.input');
        const value = 'some test value';

        expect(element).toExist();

        element.simulate('change', { target: { value: value } });

        expect(props.onValueChange).toHaveBeenCalled();
        expect(props.onValueChange).toHaveBeenCalledWith(value);
    });
});