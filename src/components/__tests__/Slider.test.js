import React from 'react';
import { shallow, mount } from 'enzyme';

import Slider from '../fields/Slider';

it('renders without crashing', () => {
    shallow(<Slider />);
});

describe('when rendering with props', () => {

    it('shows the correct value if set via props', () => {
        const props = {
            value: '50'
        };

        const wrapper = mount(<Slider {...props} />);
        const element = wrapper.find('input.slider');

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
        wrapper = mount(<Slider {...props} />);
        instance = wrapper.instance();
    });

    it('doesn\'t call the props onValueChange event if not supplied', () => {
        const newProps = {
            value: '',
        };
        wrapper = mount(<Slider {...newProps} />);

        const element = wrapper.find('input.slider');

        expect(element).toExist();

        element.simulate('change');

        expect(props.onValueChange).not.toHaveBeenCalled();
    });

    it('calls the props onValueChange event when input is changed', () => {
        const element = wrapper.find('input.slider');
        const value = '123';

        expect(element).toExist();

        element.simulate('change', { target: { value: value } });

        expect(props.onValueChange).toHaveBeenCalled();
        expect(props.onValueChange).toHaveBeenCalledWith(value);
    });
});