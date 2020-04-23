import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import Input from './fields/Input';
import InputNumber from './fields/InputNumber';
import AutoComplete from './fields/AutoComplete';
import DatePicker from './fields/DatePicker';
import Toggle from './fields/Toggle';
import Slider from './fields/Slider';

// Constants
import FIELD_TYPES from '../constants/fieldTypes';
import PROP_TYPES from '../constants/propTypes';
import OPERATORS from '../constants/operators';

/**
 * @typedef {object} fieldObj
 * @property {string} label
 * @property {string} name
 * @property {string} dataType
 * @property {string} type
 */
/**
 * @typedef {object} InputProps
 * @property {fieldObj} field
 * @property {string} value
 * @property {string} operator
 * @property {function} onValueChange
 */

/**
 * @param {InputProps} props
 */
const FieldContainer = props => {

    const {
        field,
        operator,
        value,
        onValueChange
    } = props;

    const type = field.type;

    const fieldProps = {
        operator,
        value,
        onValueChange,
        ...field
    };

    // check for nullable type operators and return empty rather than display an input component
    if (operator &&
        [
            OPERATORS.IS_NOT_PRESENT,
            OPERATORS.IS_PRESENT,
            OPERATORS.NULL,
            OPERATORS.IS_NOT_NULL
        ].includes(operator)) {
        return <></>;
    }

    switch (type) {
        case FIELD_TYPES.DATE:
            return <DatePicker {...fieldProps} />;
        case FIELD_TYPES.AUTOCOMPLETE_LIST:
            return <AutoComplete {...fieldProps} />;
        case FIELD_TYPES.TOGGLE:
            return <Toggle {...fieldProps} />
        case FIELD_TYPES.NUMBER:
            return <InputNumber {...fieldProps} />;
        case FIELD_TYPES.SLIDER:
            return <Slider {...fieldProps} />
        default:
            return <Input {...fieldProps} />;
    }
};

FieldContainer.defaultProps = {
    field: {
        label: '',
        name: '',
        dataType: '',
        type: '',
    },
    operator: '',
    value: '',
    onValueChange: null,
};

FieldContainer.propTypes = {
    field: PROP_TYPES.FIELD,
    operator: PropTypes.string,
    value: PROP_TYPES.VALUE,
    onValueChange: PropTypes.func.isRequired,
};

export default FieldContainer;