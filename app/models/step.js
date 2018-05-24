import DS from 'ember-data';
import { computed } from '@ember/object';
import { isBlank, isPresent } from '@ember/utils';

export default DS.Model.extend({
  faucet: DS.belongsTo('faucet'),
  element: DS.attr('string'),
  operation: DS.attr('string'),
  value: DS.attr('string'),
  isValid: computed('element', 'value', 'operation', 'isLoaded', function(){
    const operation = this.operation;
    return ![this.element, operation].any(isBlank) && (operation !== 'type' || isPresent(this.value));
  }),
  toCode: computed('element', 'value', 'operation', function(){
    const operation = this.operation;
    if (operation === 'click') {
      return `document.querySelector("${this.element}").click();`;
    }
    if (operation === 'type') {
      return `document.querySelector("${this.element}").value = '${this.value}';`;
    }
    return `console.error('Unknown step operation')`;
  }),
});
