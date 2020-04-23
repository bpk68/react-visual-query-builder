
/**
 * Check for empty object, string, or array and return true/false
 * @param {object} value
 * @returns {boolean}
 */
export const isNullOrEmpty = value => {
    if (typeof value === 'undefined'
        || (Array.isArray(value) && !value.length)
        || !value) {
        return true;
    }

    return false;
};

/**
 * Recursively searches for a rule group or rule using array reducer and and returns it
 * @param {string} id - id of the rule/group to find
 * @param {object} parent - the containing rule/group object
 * @returns {object} - the found rule or null if not found
 */
export const findRuleOrGroup = (id, parent) => {
    if (parent.id === id) {
        return parent
    }

    return parent.rules && parent.rules.reduce((previousItem, item) => {
        if (item.id === id) {
            return item;
        }
        if (item.rules) {
            return findRuleOrGroup(id, item);
        }

        return previousItem;
    }, null);
};

/**
 * For list-based field values, we join the input array via a pipe ('|') into a string.
 * Using this helper method, we split that field value into an array and return it, or an empty string.
 * @param {string} field
 * @returns {array} - can be an array or empty string if parameter is empty
 */
export const getFieldValue = field => {
    if (isNullOrEmpty(field)) {
        return '';
    }

    return field.split('|');
};