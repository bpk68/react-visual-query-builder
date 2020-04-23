
/**
 * Creates a new field object
 * @param {object} [{label: string; name: string; dataType: string; type: string}]
 * @returns {object} - field
 */
const generateField = (field = {}) => {

    return {
        label: field.label || '',
        name: field.name || '',
        dataType: field.dataType || '',
        type: field.type || '',
    };
};

export default generateField;