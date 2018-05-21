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
    const loaded = this.isLoaded;
    return ![this.element, operation].any(isBlank) && (operation !== 'type' || isPresent(this.value));
  }),
});
