import React from 'react';
import { shallow, mount } from 'enzyme';

import Toggle from '../fields/Toggle';

it('renders without crashing', () => {
    shallow(<Toggle />);
});

describe('when rendering with props', () => {

    it('shows the correct value if set via props', () => {
        const props = {
            value: true
        };

        const wrapper = mount(<Toggle {...props} />);
        const element = wrapper.find('input.switch');

        expect(element).toExist();
        expect(element).toHaveProp('checked', props.value);
    });
});

describe('when handling events', () => {

    let wrapper,
        instance;

    const props = {
        value: false,
        onValueChange: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = mount(<Toggle {...props} />);
        instance = wrapper.instance();
    });

    it('doesn\'t call the props onValueChange event if not supplied', () => {
        const newProps = {
            value: true,
        };
        wrapper = mount(<Toggle {...newProps} />);

        const element = wrapper.find('input.switch');

        expect(element).toExist();

        element.simulate('change');

        expect(props.onValueChange).not.toHaveBeenCalled();
    });

    it('calls the props onValueChange event when input is changed', () => {
        const element = wrapper.find('input.switch');

        expect(element).toExist();

        element.simulate('change');

        expect(props.onValueChange).toHaveBeenCalled();
        expect(props.onValueChange).toHaveBeenCalledWith(true);
    });

    it('displays the correct label text', () => {
        const element = wrapper.find('label');

        expect(element).toExist();
        expect(element.text()).toContain('off');
    });
});