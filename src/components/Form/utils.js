export function getErrorRule(rules = [], value, options = {}) {
  return rules.find((rule) => {
    if (
      rule.required &&
      (value === undefined || value === null || value === '')
    ) {
      return true;
    }
    if (
      Object.prototype.hasOwnProperty.call(rule, 'maxLen') &&
      value.length > rule.maxLen
    ) {
      return true;
    }
    if (
      Object.prototype.hasOwnProperty.call(rule, 'pattern') &&
      !rule.pattern.test(value)
    ) {
      return true;
    }
    if (
      typeof rule.validator === 'function' &&
      !rule.validator(options)(value)
    ) {
      return true;
    }
    return false;
  });
}
