import DS from 'ember-data';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import countdown from 'countdownjs';

export default DS.Model.extend({
  url: DS.attr('string'),
  address: DS.attr('string'),
  refreshRate: DS.attr('number'),
  lastClaim: DS.attr('date'),
  active: DS.attr('boolean', { defaultValue: true }),
  isValid: computed('url', 'address', 'refreshRate', function(){
    if ([this.url, this.address, this.refreshRate].any(isBlank)) { return false; }
    return true;
  }),
  isClaimable: computed.lt('nextClaim', 0),
  nextClaim: computed('lastClaim', 'refreshRate', function(){
    const lastClaim = this.lastClaim || new Date();
    return lastClaim.getTime() + this.refreshRate;
  }),
});
