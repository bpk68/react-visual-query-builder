import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import DropdownSelect from './DropdownSelect';
import FieldContainer from './FieldContainer';

// Helpers
import generateField from '../helpers/generateField';
import { isNullOrEmpty } from '../helpers/utils';

// Constants
import PROP_TYPES from '../constants/propTypes';
import { DATA_TYPE_OPERATORS } from '../constants/operators';

/**
 * @typedef {object} RuleObj
 * @property {string} id
 * @property {string} field
 * @property {string} value
 * @property {string} operator
 */
/**
 * @typedef {object} RuleProps
 * @property {RuleObj} rule
 * @property {array} fields
 * @property {function} onRemoveRule
 */

/**
 * @param {RuleProps} props
 */
const Rule = props => {

    const {
        rule: initialRule,
        fields,
    } = props;

    const {
        id,
        field: initialField,
        value: initialValue,
        operator: initialOperator
    } = initialRule;

    const [selectedOperator, setSelectedOperator] = useState(initialOperator);
    const [selectedField, setSelectedField] = useState((fields && fields.find(field => field.name === initialField)) || generateField());
    const [selectedValue, setSelectedValue] = useState(initialValue);
    const [fieldOperators, setFieldOperators] = useState([]);
    const [rule, setRule] = useState(initialRule);

    const fieldOptions = fields.map(field => ({ text: field.label, value: field.name }));

    /**
     * Given a field with a dataType property, grab the appropriate operators for that data type from 
     * the DATA_TYPE_OPERATORS constant. Otherwise set the default list of operators.
     * If, however, the field object has an operators value set (i.e. an override), then use that instead
     * @param {object} field
     * @returns {string[]} - a string array of operators, such as ['or','not','between']
     */
    const _getFieldOperators = field => {
        let availableOperators = field.dataType ? DATA_TYPE_OPERATORS[field.dataType] : DATA_TYPE_OPERATORS.DEFAULT;

        if (field && field.operators) {
            availableOperators = field.operators;
        }

        return availableOperators;
    };

    /**
     * Given an updated rule object we create a copy of the existing rule, merge the update object
     * update state and dispatch the changes to the parent component
     * @param {object} updatedRule
     */
    const _dispatchRuleUpdate = updatedRule => {

        const ruleCopy = {
            ...rule,
            ...updatedRule
        };

        setRule(ruleCopy);

        if (props.onRuleChange) {
            props.onRuleChange(ruleCopy);
        }
    };

    /**
     * When the user changes the field drop down, find the selected field object,
     * work out the appropriate operators for that field.
     * Update state values, dispatch changes to parent component
     * @param {string} fieldName
     */
    const handleFieldChange = fieldName => {
        const newSelectedField = fields.find(field => field.name === fieldName);
        const availableOperators = _getFieldOperators(newSelectedField);

        setSelectedField(newSelectedField);
        setFieldOperators(availableOperators);

        const updates = { field: fieldName };

        _dispatchRuleUpdate(updates);
    };

    /**
     * When the user changes the operators drop down,
     * update state values, dispatch changes to parent component
     * @param {string} operatorValue
     */
    const handleFieldOperatorChange = operatorValue => {
        setSelectedOperator(operatorValue);

        const updates = { operator: operatorValue };

        _dispatchRuleUpdate(updates);
    };

    /**
     * When the user changes the selected field's value,
     * update state values, dispatch changes to parent component
     * @param {string} newFieldValue
     */
    const handleFieldValueChange = newFieldValue => {
        setSelectedValue(newFieldValue);

        const updates = { value: newFieldValue };

        _dispatchRuleUpdate(updates);
    };

    // if there is an initial field set, force update the set field on component load
    useEffect(() => {
        if (!isNullOrEmpty(initialField)) {
            handleFieldChange(initialField);
        }
    }, []); // eslint-disable-line

    return (
        <div className="rule">
            <DropdownSelect
                selectedValue={selectedField.name}
                onSelectChange={handleFieldChange}
                options={fieldOptions}
            />
            <DropdownSelect
                selectedValue={selectedOperator}
                onSelectChange={handleFieldOperatorChange}
                options={fieldOperators}
            />
            <FieldContainer
                field={selectedField}
                operator={selectedOperator}
                value={selectedValue}
                onValueChange={handleFieldValueChange}
            />
            <button className="button is-danger" onClick={() => props.onRemoveRule(id)}><i className="fas fa-times"></i></button>
        </div>
    );
};

Rule.defaultProps = {
    rule: {
        id: '',
        field: '',
        value: '',
        operator: ''
    },
    fields: [],
    onRemoveRule: null,
};

Rule.propTypes = {
    rule: PROP_TYPES.RULE,
    fields: PROP_TYPES.FIELDS,
    onRuleChange: PropTypes.func,
    onRemoveRule: PropTypes.func.isRequired
};

export default Rule;