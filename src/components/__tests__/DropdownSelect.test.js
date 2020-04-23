import React from 'react';
import { shallow, mount } from 'enzyme';

import DropdownSelect from '../DropdownSelect';

it('renders without crashing', () => {
    shallow(<DropdownSelect />);
});

describe('when rendering with props', () => {

    it('shows the correct value if set via props', () => {
        const props = {
            selectedValue: 'this is a test',
            options: [
                { text: 'one', value: 'value one' },
                { text: 'two', value: 'value two' },
                { text: 'three', value: 'value three' },
            ]
        };

        const wrapper = mount(<DropdownSelect {...props} />);
        const element = wrapper.find('.select select');

        expect(element).toExist();
        expect(element).toHaveProp('value', props.selectedValue);
    });
});

describe('when handling events', () => {

    let wrapper,
        instance;

    const props = {
        selectedValue: '',
        onSelectChange: jest.fn(),
        options: [
            { text: 'one', value: 'value one' },
            { text: 'two', value: 'value two' },
            { text: 'three', value: 'value three' },
        ]
    };

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = mount(<DropdownSelect {...props} />);
        instance = wrapper.instance();
    });

    it('doesn\'t call the props onValueChange event if not supplied', () => {
        const newProps = {
            ...props,
            onSelectChange: null
        };
        wrapper = mount(<DropdownSelect {...newProps} />);

        const element = wrapper.find('.select select');

        expect(element).toExist();

        element.simulate('change');

        expect(props.onSelectChange).not.toHaveBeenCalled();
    });

    it('calls the props onValueChange event when input is changed', () => {
        const element = wrapper.find('.select select');
        const value = '123';

        expect(element).toExist();

        element.simulate('change', { target: { value: value } });

        expect(props.onSelectChange).toHaveBeenCalled();
        expect(props.onSelectChange).toHaveBeenCalledWith(value);
    });
});