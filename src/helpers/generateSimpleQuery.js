import nanoid from 'nanoid';
import generateRuleGroup from './generateRuleGroup';

/**
 * Creates a new query object
 * @param {object} [{id: string; rules: array}]
 * @returns {object} - query
 */
const generateSimpleQuery = (query = {}) => {

    return {
        id: query.id || `q-${nanoid()}`,
        rules: query.rules || [generateRuleGroup()]
    };
};

export default generateSimpleQuery;