import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import nextId from 'react-id-generator';
import PROP_TYPES from '../../constants/propTypes';

/**
 * @typedef {object} ToggleProps
 * @property {string} value
 * @property {function} onValueChange
 */

/**
 * @param {ToggleProps} props
 */
const Toggle = props => {

    const inputId = nextId();
    const [labelText, setLabelText] = useState('off');
    const [selectedValue, setSelectedValue] = useState(props.value || false);

    /**
     * When a user changes the toggle, update state, dispatch updated value
     * @param {event} evt - the synthetic React event
     */
    const handleValueChange = evt => {
        const isChecked = !selectedValue;
        setSelectedValue(isChecked);
        setLabelText(isChecked ? 'on' : 'off');

        if (props.onValueChange) {
            props.onValueChange(isChecked);
        }
    }

    return (
        <div className="field">
            <input
                id={inputId}
                className="switch"
                type="checkbox"
                checked={selectedValue}
                onChange={handleValueChange}
            />
            <label htmlFor={inputId}>{labelText}</label>
        </div>

    );
};

Toggle.defaultProps = {
    value: false,
    onValueChange: null,
};

Toggle.propTypes = {
    value: PROP_TYPES.VALUE,
    onValueChange: PropTypes.func,
};

export default Toggle;