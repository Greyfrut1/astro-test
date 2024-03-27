const { propertyGroups } = require('stylelint-config-clean-order');

const propertyOrder = propertyGroups.map((properties) => ({
  noEmptyLineBetween: true,
  emptyLineBefore: 'never', // Don't add empty lines between order groups.
  properties,
}));

module.exports = {
  extends: [
    'stylelint-prettier/recommended',
    'stylelint-config-clean-order',
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
  ],
  rules: {
    'declaration-empty-line-before': null,
    'custom-property-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'scss/dollar-variable-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    'scss/dollar-variable-empty-line-before': null,
    'scss/no-global-function-names': null,
    'order/order': [
      ['dollar-variables', 'at-variables', 'custom-properties', 'declarations'],
      {
        severity: 'warning',
      },
    ],
    'order/properties-order': [
      propertyOrder,
      {
        severity: 'warning',
        unspecified: 'bottomAlphabetical',
      },
    ],
  },
};
