import React, { useState } from 'react';
import PropTypes from 'prop-types';
import nextId from 'react-id-generator';

/**
 * @typedef {object} InputNumberProps
 * @property {string} value
 * @property {function} onValueChange
 */

/**
 * @param {InputNumberProps} props
 */
const InputNumber = props => {

    const [selectedValue, setSelectedValue] = useState(props.value || '');
    const [hasError, setHasError] = useState(false)

    /**
     * Checks if the input is numerical (good) or not (bad)
     * @param {string} value
     * @returns {boolean} 
     */
    const _hasValidationErrors = value => {
        const error = isNaN(parseFloat(value));
        setHasError(error);
        return error;
    };

    /**
     * When a user enters some input, check for errors, update state and dispatch updated value
     * @param {event} evt - the synthetic React event
     */
    const handleValueChange = evt => {
        setSelectedValue(evt.target.value);

        if (_hasValidationErrors(evt.target.value)) {
            return;
        }

        if (props.onValueChange) {
            props.onValueChange(evt.target.value);
        }
    }

    return (
        <input
            id={nextId()}
            type="number"
            className={`input ${hasError === true ? 'has-error' : ''}`}
            value={selectedValue}
            onChange={handleValueChange}
            placeholder="enter a value"
        />
    );
};

InputNumber.defaultProps = {
    value: '',
    onValueChange: null,
};

InputNumber.propTypes = {
    value: PropTypes.string,
    onValueChange: PropTypes.func,
};

export default InputNumber;