import React, { useState, useEffect, useCallback } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import PropTypes from 'prop-types';

// Styles
import './assets/styles.scss';
import 'fontawesome/js/all.js';

// Components
import RuleGroup from './components/RuleGroup';

// Helpers
import generateSimpleQuery from './helpers/generateSimpleQuery';
import { findRuleOrGroup } from './helpers/utils';

/**
 * @typedef {object} QBuilderProps
 * @property {array} targets
 * @property {array} fields
 * @property {array} combinators
 * @property {function} onQueryChange
 * @property {boolean} useCustomStyles
 * @property {object} query
 */

/**
 * @param {QBuilderProps} props
 */
const QBuilder = props => {

    /**
     * Checks for a passed in query object and returns a populated query object or empty query object
     * @returns {object} - query object
     */
    const _getInitialQuery = useCallback(() => {
        return (props.query && generateSimpleQuery(props.query)) || generateSimpleQuery();
    }, [props.query]);


    const { combinators, fields } = props;
    const [query, setQuery] = useState(_getInitialQuery());


    /**
     * Given an updated query object, we do a deep clone from lodash library and pass it along
     * to the parent component's onQueryChange method
     * @param {object} newQuery
     */
    const _dispatchQueryUpdate = newQuery => {

        if (props.onQueryChange) {
            const query = cloneDeep(newQuery);
            props.onQueryChange(query);
        }
    };

    /**
       * When a rule group has changed one or more values, create a copy of the query, find the target rule group,
       * create a new rule group object and then update state values, dispatch changes to parent component
       * @param {object} updatedRuleGroup
       */
    const handleRuleGroupChange = updatedRuleGroup => {
        const queryCopy = { ...query };

        const targetGroup = findRuleOrGroup(updatedRuleGroup.id, queryCopy);

        Object.assign(targetGroup, updatedRuleGroup);

        setQuery(queryCopy);
        _dispatchQueryUpdate(queryCopy);
    };

    /**
    * When a rule group is removed, create a copy of the query object, find the target rule group,
    * grab the target rule group index and the splice the current rules, removing the target group.
    * Update state values, dispatch changes to parent component
    * @param {string} parentGroupId
    * @param {string} id
    */
    const handleRemoveRuleGroup = (parentGroupId, id) => {
        const queryCopy = { ...query }

        const parentGroup = findRuleOrGroup(parentGroupId, queryCopy);
        const index = parentGroup.rules.findIndex(item => item.id === id);

        parentGroup.rules.splice(index, 1);

        setQuery(queryCopy);
        _dispatchQueryUpdate(queryCopy);
    };

    // Set the query state when a new query prop comes in
    useEffect(() => {
        setQuery(generateSimpleQuery(props.query || _getInitialQuery()));
    }, [props.query, _getInitialQuery]);


    // Notify a query change on mount
    useEffect(() => {
        _dispatchQueryUpdate(query);
    }, []); // eslint-disable-line

    return (
        <div className={`${!props.useCustomStyles ? 'react-qb' : ''}`}>
            {
                query.rules.length &&
                query.rules.map(ruleGroup => (
                    <RuleGroup
                        parentGroupId={ruleGroup.id}
                        key={ruleGroup.id}
                        combinators={combinators}
                        fields={fields}
                        ruleGroup={ruleGroup}
                        onRuleGroupChange={handleRuleGroupChange}
                        onRemoveRuleGroup={handleRemoveRuleGroup}
                        showRemoveButton={false}
                    />
                ))
            }
        </div>
    );
};

QBuilder.defaultProps = {
    targets: [],
    fields: [],
    combinators: [],
    onQueryChange: null,
    useCustomStyles: false,
    query: null,
};

QBuilder.propTypes = {
    targets: PropTypes.arrayOf(PropTypes.shape(
        {
            name: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            selectValues: PropTypes.arrayOf(PropTypes.shape({
                text: PropTypes.string,
                value: PropTypes.string
            }))
        }
    )),
    fields: PropTypes.arrayOf(PropTypes.shape(
        {
            label: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string,
            operators: PropTypes.arrayOf(PropTypes.string),
            data: PropTypes.array
        }
    )),
    combinators: PropTypes.array,
    onQueryChange: PropTypes.func,
    useCustomStyles: PropTypes.bool,
    query: PropTypes.object
};

export default QBuilder;