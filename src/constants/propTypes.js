import PropTypes from 'prop-types';


const field = PropTypes.shape(
    {
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        dataType: PropTypes.string,
        type: PropTypes.string,
        operators: PropTypes.arrayOf(PropTypes.string),
        data: PropTypes.array
    }
);

const value = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
]);

const PROP_TYPES = {
    FIELD: field,
    FIELDS: PropTypes.arrayOf(field),
    RULE_GROUP: PropTypes.shape(
        {
            id: PropTypes.string,
            rules: PropTypes.arrayOf(PropTypes.shape(
                {
                    id: PropTypes.string,
                    field: PropTypes.string,
                    value: value,
                    operator: PropTypes.string
                }
            )),
            combinator: PropTypes.string,
            not: PropTypes.bool,
        }
    ),
    RULE: PropTypes.shape(
        {
            id: PropTypes.string,
            field: PropTypes.string,
            value: value,
            operator: PropTypes.string,
        }
    ),
    VALUE: value,
};

export default PROP_TYPES;