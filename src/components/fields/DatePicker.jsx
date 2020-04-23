import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import nextId from 'react-id-generator';

import 'react-datepicker/dist/react-datepicker.css';

// Helpers
import { isNullOrEmpty } from '../../helpers/utils';

// Constants
import OPERATORS from '../../constants/operators';

/**
 * @typedef {object} DatePickerProps
 * @property {string} operator
 * @property {string} value
 * @property {function} onValueChange
 */

/**
 * @typedef {object} dateObject
 * @property {string} startDate
 * @property {string} endDate
 * @property {number} plusDays
 */

/**
 * @param {DatePickerProps} props
 */
const DatePicker = props => {

    const defaultDateObj = {
        startDate: '',
        endDate: '',
        plusDays: 0,
    };
    const [dateObj, setDateObj] = useState(!isNullOrEmpty(props.value) ? JSON.parse(props.value) : defaultDateObj)
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [selectedNumber, setSelectedNumber] = useState(0);

    // Private methods
    /**
     * Shorthand to check if we're using the 'between' operator
     * @returns {boolean}
     */
    const _useDoubleValue = () => {
        return props.operator && props.operator === OPERATORS.BETWEEN;
    };

    /**
     * Converts the datepicker date format (long form navtive JS date), into a unix timestamp version
     * @param {string} date
     * @returns {date} - iso formatted unix timestamp in milliseconds
     */
    const _getIsoDate = date => {
        const isoDate = moment(date).valueOf();
        return moment(isoDate).isValid() ? isoDate : '';
    };

    /**
     * Creates an updated date value object and informs the parent component of the change
     * Updates state value
     * @param {dateObject} updatedDateObj
     */
    const _dispatchValueChange = updatedDateObj => {
        const dateObjCopy = {
            ...dateObj,
            ...updatedDateObj
        };

        setDateObj(dateObjCopy);

        if (props.onValueChange) {
            props.onValueChange(JSON.stringify(dateObjCopy));
        }
    };


    // Handlers
    /**
     * Converts the selected start date to an unix timestamp, and checks that the end date is _after_ the selected start date
     * If not, we set the end date to the selected start date
     * Update state and dispatch updated value(s)
     * @param {string} date
     */
    const handleStartDateChange = date => {
        const updates = { startDate: _getIsoDate(date) };

        // check if start date is _after_ end date and correct
        if (!isNullOrEmpty(endDate) && moment(date).isAfter(moment(endDate))) {
            updates.endDate = _getIsoDate(date);
            setEndDate(date);
        }

        setStartDate(date);
        _dispatchValueChange(updates);
    };

    /**
     * Converts the selected end date to an unix timestamp, updates state and dispatches updated value
     * @param {*} date
     */
    const handleEndDateChange = date => {
        const updates = { endDate: _getIsoDate(date) };

        setEndDate(date);
        _dispatchValueChange(updates);
    };

    /**
     * When a user enters some input, update state dispatch updated plus/minus days
     * @param {event} evt - the synthetic React event
     */
    const handleValueChange = evt => {

        const updates = { plusDays: evt.target.value };

        setSelectedNumber(evt.target.value);
        _dispatchValueChange(updates);
    };


    return (
        <>
            <ReactDatePicker
                dateFormat="dd/MM/yyyy"
                showPopperArrow={false}
                selected={startDate}
                onChange={handleStartDateChange}
                isClearable
                placeholderText="choose a start date"
            />
            {
                _useDoubleValue() ?
                    <>
                        <span>and</span>
                        <ReactDatePicker
                            dateFormat="dd/MM/yyyy"
                            showPopperArrow={false}
                            selected={endDate}
                            minDate={startDate}
                            onChange={handleEndDateChange}
                            isClearable
                            placeholderText="choose an end date"
                        />
                    </>
                    : null
            }
            {
                props.operator && props.operator === OPERATORS.PLUS_MINUS_DAYS ?
                    <>
                        <span>+/- days</span>
                        <input
                            id={nextId()}
                            className="input"
                            type="number"
                            value={selectedNumber}
                            onChange={handleValueChange}
                            placeholder="+/- days"
                        />
                    </>
                    : null
            }
        </>
    )
};

DatePicker.defaultProps = {
    operator: '',
    value: '',
    onValueChange: null,
};

DatePicker.propTypes = {
    operator: PropTypes.string,
    value: PropTypes.string,
    onValueChange: PropTypes.func,
};

export default DatePicker