import React, { useState } from 'react';
import PropTypes from 'prop-types';
import nextId from 'react-id-generator';

/**
 * @typedef {object} AutoCompleteProps
 * @property {string} value
 * @property {{name: string; value: string;}[]} data
 * @property {function} onValueChange
 */

/**
 * @param {AutoCompleteProps} props
 */
const AutoComplete = props => {

    const {
        data
    } = props;

    const initialValue = props.value ? data.find(item => item.value === props.value) : null;
    const [isSearching, setIsSearching] = useState(false);
    const [filteredData, setFilteredData] = useState(data || []);
    const [selectedDisplayValue, setSelectedDisplayValue] = useState(initialValue ? initialValue.name : '');

    let searchInputRef = React.createRef();
    let _timeoutID;


    /**
     * Checks to see if the entered search term matches the name or value in an item object
     * @param {{name: string; value:string;}} item
     * @param {string} searchTerm
     * @returns {boolean} - if search term was found in the list
     */
    const _searchFilter = (item, searchTerm) => {
        searchTerm = searchTerm.toLowerCase();

        return item.name.toLowerCase().includes(searchTerm)
            || item.name.toLowerCase() === searchTerm
            || (typeof item.includes !== 'undefined' && item.value.includes(searchTerm))
            || item.value === searchTerm;
    };

    /**
     * Informs parent of input value change
     * @param {string} value
     */
    const _dispatchValueChange = value => {

        if (props.onValueChange) {
            props.onValueChange(value.toString());
        }
    };

    /**
     * Once a user selects a term from the drop down, we update state and dispatch the change notification
     * @param {{name: string; value: string;}} item
     */
    const handleResultSelect = item => {
        setSelectedDisplayValue(item.name);
        _dispatchValueChange(item.value.toString());
        setIsSearching(false);
    };

    /**
     * When the autocomplete input is selected, we filter the existing autocomplete dropdown,
     * update state and focus the correct html input element
     */
    const handleInputFocus = () => {
        setIsSearching(true);
        setFilteredData(data.filter(item => _searchFilter(item, selectedDisplayValue)));

        searchInputRef.current.focus();
    };

    /**
     * Clears the timeout object when autocomplete is focussed
     * @param {event} evt - the synthetic React event
     */
    const handleAutoCompleteFocus = evt => {
        clearTimeout(_timeoutID);
    };

    /**
     * When input is blurred, we create a timeout object to reset the search state value
     * which clears the UI of the autocomplete dropdown
     * @param {event} evt - the synthetic React event
     */
    const handleAutoCompleteBlur = evt => {
        _timeoutID = setTimeout(() => {
            setIsSearching(false);
        }, 100);
    };

    /**
     * When a user enters some input, update state and search through the supplied list 
     * of autocomplete values to narrow down their search
     * @param {event} evt - the synthetic React event
     */
    const handleValueChange = evt => {
        const searchValue = evt.target.value;
        const filteredDataCopy = data.filter(item => _searchFilter(item, searchValue));

        setFilteredData(filteredDataCopy);
        setSelectedDisplayValue(searchValue);
    }

    return (
        <div className="autocomplete-container">
            <input
                id={nextId()}
                value={selectedDisplayValue}
                onFocus={handleInputFocus}
                className={`input input-search ${isSearching ? '' : 'is-active'}`}
                readOnly={true}
                data-testid="inputAutoCompleteOne"
            />
            <div
                className={`autocomplete-results ${isSearching ? 'is-active' : ''}`}
                onFocus={handleAutoCompleteFocus}
                onBlur={handleAutoCompleteBlur}
                data-testid="divAutoCompleteResults"
            >
                <input
                    id={nextId()}
                    ref={searchInputRef}
                    className="input"
                    value={selectedDisplayValue}
                    onChange={handleValueChange}
                />
                <ul>
                    {
                        filteredData.map(item => (
                            <li
                                key={item.value}
                                onClick={() => handleResultSelect(item)}
                            >
                                {item.name}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

AutoComplete.defaultProps = {
    value: '',
    onValueChange: null,
    data: []
};

AutoComplete.propTypes = {
    value: PropTypes.string,
    onValueChange: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.any
    })),
};

export default AutoComplete;