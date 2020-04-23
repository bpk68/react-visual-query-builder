import React, { useState } from 'react';
import PropTypes from 'prop-types';
import nextId from 'react-id-generator';

/**
 * @typedef {object} InputProps
 * @property {string} value
 * @property {function} onValueChange
 */

/**
 * @param {InputProps} props
 */
const Input = props => {

    const [selectedValue, setSelectedValue] = useState(props.value || '');

    /**
     * When a user enters some input, update state, dispatch updated value
     * @param {event} evt - the synthetic React event
     */
    const handleValueChange = evt => {
        setSelectedValue(evt.target.value);

        if (props.onValueChange) {
            props.onValueChange(evt.target.value);
        }
    }

    return (
        <input
            id={nextId()}
            className="input"
            type="text"
            value={selectedValue}
            onChange={handleValueChange}
            placeholder="enter a value"
        />
    );
};

Input.defaultProps = {
    value: '',
    onValueChange: null,
};

Input.propTypes = {
    value: PropTypes.string,
    onValueChange: PropTypes.func,
};

export default Input;