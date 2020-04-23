import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import DropdownSelect from './DropdownSelect';
import Rule from './Rule';

// Helpers
import generateRule from '../helpers/generateRule';
import generateRuleGroup from '../helpers/generateRuleGroup';

// Constants
import PROP_TYPES from '../constants/propTypes';

/**
 * @typedef {object} RuleGroupObj
 * @property {string} id
 * @property {array} rules
 * @property {string} combinator
 * @property {boolean} not
 */
/**
 * @typedef {object} RuleGroupProps
 * @property {string} parentGroupId
 * @property {array} fields
 * @property {RuleGroupObj} ruleGroup
 * @property {array} combinators
 * @property {function} onRuleGroupChange
 * @property {function} onRemoveRuleGroup
 * @property {boolean} showRemoveButton
 */

/**
 * @param {RuleGroupProps} props
 */
const RuleGroup = props => {

    const {
        ruleGroup: initialRuleGroup,
        combinators,
        fields,
        showRemoveButton,
        parentGroupId
    } = props;

    const {
        id,
        combinator: initialCombinator,
        not
    } = initialRuleGroup;

    const combinatorValue = initialCombinator || (combinators && combinators[0] ? combinators[0] : '');

    const [selectedCombinator, setCombinator] = useState(combinatorValue);
    const [ruleGroup, setRuleGroup] = useState(initialRuleGroup || generateRuleGroup({ combinator: combinatorValue }));

    /**
     * Given an updated rule group object we create a copy of the existing group, merge the update object
     * update state and dispatch the changes to the parent component
     * @param {object} updatedRuleGroup
     */
    const _dispatchRuleGroupUpdate = updatedRuleGroup => {

        const ruleGroupCopy = {
            ...ruleGroup,
            ...updatedRuleGroup
        };

        setRuleGroup(ruleGroupCopy);

        if (props.onRuleGroupChange) {
            props.onRuleGroupChange(ruleGroupCopy);
        }
    };

    // Handle Rule changes -----------------------------------------------------//
    /**
     * When the user changes a combinator drop down,
     * update state values, dispatch changes to parent component
     * @param {string} selectedCombinator
     */
    const handleOnCombinatorChange = selectedCombinator => {
        setCombinator(selectedCombinator);

        const updates = { combinator: selectedCombinator };

        _dispatchRuleGroupUpdate(updates);
    };

    /**
    * When the user adds a rule, we create a copy of the current group's rules, adding in an empty rule
    * from the 'generateRule()' method. 
    * Update state values, dispatch changes to parent component
    */
    const handleAddRule = () => {
        const rulesCopy = [
            ...ruleGroup.rules,
            generateRule()
        ];

        const updates = { rules: rulesCopy };

        _dispatchRuleGroupUpdate(updates);
    };

    /**
    * When the user removes or deletes a rule, filter this rule out of the existing rules by id value.
    * Update state values, dispatch changes to parent component
    * @param {string} id
    */
    const handleRemoveRule = id => {
        const rulesCopy = ruleGroup.rules.filter(rule => rule.id !== id);
        const updates = { rules: rulesCopy };

        _dispatchRuleGroupUpdate(updates);
    };

    /**
     * Given an updated rule object we create a copy of the existing group's rules, 
     * swapping out the existing, matching rule based on id, for the updated one.
     * Update state and dispatch the changes to the parent component
     * @param {object} updatedRuleGroup
     */
    const handleRuleChange = updatedRule => {
        const rulesCopy = ruleGroup.rules.map(rule => rule.id === updatedRule.id ? updatedRule : rule);
        const updates = { rules: rulesCopy };

        _dispatchRuleGroupUpdate(updates);
    };


    // Handle Rule Group changes ----------------------------------------------- //
    /**
    * When the user adds a new group, we create a copy of the current group's rules, adding in an empty group
    * from the 'generateRuleGroup()' method.
    * Update state values, dispatch changes to parent component
    */
    const handleAddRuleGroup = () => {
        const rulesCopy = [
            ...ruleGroup.rules,
            generateRuleGroup()
        ];

        const updates = { rules: rulesCopy };

        _dispatchRuleGroupUpdate(updates);
    };

    // Update default things like the combinator
    useEffect(() => {
        const ruleGroupCopy = {
            ...ruleGroup,
            ...{
                combinator: combinatorValue,
                //rules: rules
            }
        }

        _dispatchRuleGroupUpdate(ruleGroupCopy);
    }, []);

    return (
        <div className="rule-group" id={id}>
            <DropdownSelect
                selectedValue={selectedCombinator}
                options={props.combinators}
                onSelectChange={handleOnCombinatorChange}
            />
            <button className="button is-primary" onClick={handleAddRule}><i className="fas fa-plus"></i> rule</button>
            <button className="button is-primary" onClick={handleAddRuleGroup}><i className="fas fa-plus"></i> group</button>
            {
                showRemoveButton ?
                    <button className="button is-danger" onClick={() => props.onRemoveRuleGroup(parentGroupId, id)}><i className="fas fa-times"></i></button>
                    : null
            }
            {
                ruleGroup.rules && ruleGroup.rules.map(rule => (
                    rule.hasOwnProperty('rules') ?
                        <RuleGroup
                            parentGroupId={id}
                            key={rule.id}
                            combinators={combinators}
                            fields={fields}
                            ruleGroup={rule}
                            onRuleGroupChange={props.onRuleGroupChange}
                            onRemoveRuleGroup={props.onRemoveRuleGroup}
                        />
                        :
                        <Rule
                            key={rule.id}
                            rule={rule}
                            fields={props.fields}
                            onRemoveRule={handleRemoveRule}
                            onRuleChange={handleRuleChange}
                        />
                ))
            }
        </div>
    );
};

RuleGroup.defaultProps = {
    parentGroupId: null,
    fields: [],
    ruleGroup: {},
    combinators: [],
    onRuleGroupChange: null,
    onRemoveRuleGroup: null,
    showRemoveButton: true,
};

RuleGroup.propTypes = {
    parentGroupId: PropTypes.string.isRequired,
    fields: PROP_TYPES.FIELDS,
    ruleGroup: PROP_TYPES.RULE_GROUP,
    combinators: PropTypes.array,
    onRuleGroupChange: PropTypes.func.isRequired,
    onRemoveRuleGroup: PropTypes.func.isRequired,
};


export default RuleGroup;