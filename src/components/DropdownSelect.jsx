import React, { useState } from 'react';
import PropTypes from 'prop-types';
import nextId from 'react-id-generator';

/**
 * @typedef {object} DropdownSelectProps
 * @property {array} options
 * @property {function} onSelectChange
 * @property {string} selectedValue
 */

/**
 * @param {DropdownSelectProps} props
 */
const DropdownSelect = props => {

    const defaultValue = "__default";
    const [selectValue, setSelectValue] = useState(props.selectedValue || defaultValue);
    const { onSelectChange } = props;

    /**
     * When a user changes the select value, check if it's not the default option
     * update state, dispatch updated value
     * @param {event} evt - the synthetic React event
     */
    const handleSelectChange = evt => {
        if (evt.target.value === defaultValue) {
            return;
        }

        setSelectValue(evt.target.value);

        if (onSelectChange) {
            onSelectChange(evt.target.value)
        }
    }

    return (
        <div className="select">
            <select
                id={nextId()}
                onChange={handleSelectChange}
                value={selectValue}
                disabled={!props.options}
            >
                <option value={defaultValue}>Please choose...</option>
                {
                    props.options.map(option =>
                        <option
                            key={nextId('option-')}
                            value={option.value || option}
                        >
                            {option.text || option}
                        </option>
                    )
                }
            </select>
        </div>
    );
};

DropdownSelect.defaultProps = {
    options: [],
    onSelectChange: null,
    selectedValue: null,
};

DropdownSelect.propTypes = {
    options: PropTypes.oneOfType(
        [
            PropTypes.arrayOf(PropTypes.shape(
                {
                    text: PropTypes.string,
                    value: PropTypes.string
                }
            )),
            PropTypes.arrayOf(PropTypes.string)
        ]
    ),
    onSelectChange: PropTypes.func,
    selectedValue: PropTypes.string,
};

export default DropdownSelect;