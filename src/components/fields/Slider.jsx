import React, { useState } from 'react';
import PropTypes from 'prop-types';
import nextId from 'react-id-generator';

/**
 * @typedef {object} SliderProps
 * @property {{min: number; max: number;}} range
 * @property {string} value
 * @property {function} onValueChange
 */

/**
 * @param {SliderProps} props
 */
const Slider = props => {

    const inputId = nextId();
    const [selectedValue, setSelectedValue] = useState(props.value || '');

    /**
     * When a changes the slider value, update state, dispatch updated value
     * @param {event} evt - the synthetic React event
     */
    const handleValueChange = evt => {
        setSelectedValue(evt.target.value);

        if (props.onValueChange) {
            props.onValueChange(evt.target.value);
        }
    }

    return (
        <>
            <input
                id={inputId}
                type="range"
                className="slider is-fullwidth"
                step="1"
                min={props.range.min}
                max={props.range.max}
                value={selectedValue}
                onChange={handleValueChange}
                placeholder="enter a value"
            />
            <output htmlFor={inputId}>{selectedValue}</output>
        </>
    );
};

Slider.defaultProps = {
    range: {
        min: 0,
        max: 100
    },
    value: '',
    onValueChange: null,
};

Slider.propTypes = {
    range: PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number
    }),
    value: PropTypes.string,
    onValueChange: PropTypes.func,
};

export default Slider;