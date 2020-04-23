import React from 'react';
import { shallow, mount } from 'enzyme';

import FieldContainer from '../FieldContainer';
import FIELD_TYPES from '../../constants/fieldTypes';


const initialProps = Object.freeze({
    field: {
        label: '',
        name: '',
        dataType: '',
        type: '',
    },
    operator: '',
    value: 'my test value',
    onValueChange: jest.fn(),
});

it('renders without crashing', () => {
    shallow(<FieldContainer />);
});

describe('when rendering with props', () => {

    it('shows the correct value if set via props', () => {
        const wrapper = mount(<FieldContainer {...initialProps} />);
        const element = wrapper.find('input[type="text"]');

        expect(element).toExist();
        expect(element).toHaveProp('value', initialProps.value);
    });

    it('renders the correct field based on provided dataType', () => {
        const props = {
            ...initialProps,
            field: {
                ...initialProps.field,
                type: FIELD_TYPES.TOGGLE
            }
        }
        const wrapper = mount(<FieldContainer {...props} />);
        const element = wrapper.find('input[type="text"]');
        const checkbox = wrapper.find('input[type="checkbox"]');

        expect(element).not.toExist();
        expect(checkbox).toExist();
    });
});
