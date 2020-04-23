import React from 'react';
import { shallow, mount } from 'enzyme';

import { render, fireEvent, cleanup } from '@testing-library/react';

import DatePicker from '../fields/DatePicker';
import OPERATORS from '../../constants/operators';

it('renders without crashing', () => {
    shallow(<DatePicker />);
});

describe('when rendering with props', () => {

    it('shows the correct value if set via props', () => {
        const props = {
            value: '1574689492905'
        };

        const wrapper = mount(<DatePicker {...props} />);
        const element = wrapper.find('.react-datepicker__input-container input');

        expect(element).toExist();
    });
});

describe('when handling events', () => {

    let wrapper,
        instance;

    const props = {
        value: '1574689492905',
        onValueChange: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = mount(<DatePicker {...props} />);
        instance = wrapper.instance();
    });

    it('only shows one date picker by default', () => {
        const element = wrapper.find('.react-datepicker__input-container input');

        expect(element.length).toBe(1);
    });

    it('shows two datepickers when the correct operator is set', () => {
        const newProps = {
            ...props,
            operator: OPERATORS.BETWEEN
        };
        wrapper = mount(<DatePicker {...newProps} />);
        const element = wrapper.find('.react-datepicker__input-container input');

        expect(element.length).toBe(2);
    });

    it('shows the days selector input when the correct operator is set', () => {
        const newProps = {
            ...props,
            operator: OPERATORS.PLUS_MINUS_DAYS
        };
        wrapper = mount(<DatePicker {...newProps} />);
        const element = wrapper.find('input.input');

        expect(element).toExist();
    });

    it('doesn\'t call the props onValueChange event if not supplied', () => {
        const newProps = {
            value: '1574689492905',
        };
        wrapper = mount(<DatePicker {...newProps} />);

        const element = wrapper.find('.react-datepicker__input-container input');

        expect(element).toExist();

        element.simulate('change', { target: { value: '11/12/2019' } });

        expect(props.onValueChange).not.toHaveBeenCalled();
    });

    it('calls the props onValueChange event when input is changed', () => {
        const element = wrapper.find('.react-datepicker__input-container input');

        expect(element).toExist();

        element.simulate('change', { target: { value: '11/12/2019' } });

        expect(props.onValueChange).toHaveBeenCalled();
    });
});

describe('when validating input', () => {

    let wrapper,
        instance;

    const props = {
        value: '1574689492905',
        operator: OPERATORS.BETWEEN,
        onValueChange: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = mount(<DatePicker {...props} />);
        instance = wrapper.instance();
    });

    afterEach(cleanup);

    it('won\'t allow the end date to be set _before_ the start date', () => {
        const { getByPlaceholderText } = render(<DatePicker {...props} />);
        const startDate = getByPlaceholderText('choose a start date');
        const endDate = getByPlaceholderText('choose an end date');

        fireEvent.change(endDate, { target: { value: '11/12/2019' } });

        expect(endDate).toHaveValue('11/12/2019');

        fireEvent.change(startDate, { target: { value: '01/03/2020' } });

        expect(endDate).toHaveValue('01/03/2020');
    });
});