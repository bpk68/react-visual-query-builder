import nanoid from 'nanoid';

/**
 * Creates a new query rule object
 * @param {object} [{id: string; field: string; value: string; operator: string}]
 * @returns {object} - query rule
 */
const generateRule = (rule = {}) => {

    return {
        id: rule.id || `r-${nanoid()}`,
        field: rule.field || '',
        value: rule.value || '',
        operator: rule.operator || '',
    };
};

export default generateRule;