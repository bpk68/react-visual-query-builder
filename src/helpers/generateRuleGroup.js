import nanoid from 'nanoid';

/**
 * Creates a new rule group object
 * @param {object} [{id: string; rules: []; combinator: string; not: boolean}]
 * @returns {object} - rule group
 */
const generateRuleGroup = (group = {}) => {

    return {
        id: group.id || `g-${nanoid()}`,
        rules: group.rules || [],
        combinator: group.combinator || '',
        not: false
    };
};

export default generateRuleGroup;