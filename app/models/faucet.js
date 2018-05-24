import DS from 'ember-data';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

export default DS.Model.extend({
  url: DS.attr('string'),
  refreshRate: DS.attr('number'),
  lastClaim: DS.attr('date', { defaultValue: () => new Date() }),
  active: DS.attr('boolean', { defaultValue: true }),
  steps: DS.hasMany('step', { async: true }),
  // eslint-disable-next-line ember/use-brace-expansion
  isValid: computed('url', 'lastClaim', 'refreshRate', 'steps.[]','steps.@each.isValid', function(){
    const stepsValid = this.steps.isEvery('isValid');
    return stepsValid && ![this.url, this.lastClaim, this.refreshRate].any(isBlank);
  }),
  // eslint-disable-next-line ember/use-brace-expansion
  isDirty: computed('hasDirtyAttributes', 'steps.[]', 'steps.@each.hasDirtyAttributes', function(){
    const stepsDirty = this.steps.isAny('hasDirtyAttributes');
    return stepsDirty || this.hasDirtyAttributes;
  }),
  isClaimable: computed.lt('nextClaim', 0),
  nextClaim: computed('lastClaim', 'refreshRate', function(){
    const lastClaim = this.lastClaim || new Date();
    const refreshRate = Number.parseInt(this.refreshRate, 10);
    const time = lastClaim.getTime();
    return time + refreshRate;
  }),
  toCode: computed('steps.{[],@each.toCode,@each.isLoaded}', function(){
    const steps = this.get('steps');
    return steps.mapBy('toCode').join('\n');
  }),
});
