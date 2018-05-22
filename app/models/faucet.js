import DS from 'ember-data';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

export default DS.Model.extend({
  url: DS.attr('string'),
  refreshRate: DS.attr('string'),
  lastClaim: DS.attr('date', { defaultValue: () => new Date() }),
  active: DS.attr('boolean', { defaultValue: true }),
  steps: DS.hasMany('step', { async: true }),
  isValid: computed('url', 'lastClaim', 'refreshRate', 'steps.[]','steps.@each.isValid', function(){
    const stepsValid = this.steps.isEvery('isValid');
    return stepsValid && ![this.url, this.lastClaim, this.refreshRate].any(isBlank);
  }),
  isDirty: computed('hasDirtyAttributes', 'steps.[]','steps.@each.hasDirtyAttributes', function(){
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
  refreshInterval: computed('refreshRate', function(){
    const refreshRate = Number.parseInt(this.refreshRate, 10);
    const seconds = refreshRate / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    if (seconds <= 60) { return `Every ${seconds} seconds`; }
    if (minutes <= 60) { return `Every ${minutes} minutes`; }
    if (hours <= 24) { return `Every ${hours} hours`; }
    return `Every ${hours / 24} days`;
  }),
});
