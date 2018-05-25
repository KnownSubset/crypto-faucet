/* global browser */
import Service from '@ember/service';
import RSVP from 'rsvp';
import Ember from 'ember';

export default Service.extend({
  async run(faucet) {
    try {
      //const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
      const tab = await browser.tabs.create( { active: true, url: faucet.url });
      Ember.Logger.debug(new Date());
      await new RSVP.Promise(resolve => window.setTimeout(resolve, 3000));
      Ember.Logger.debug(new Date());
      const steps = await faucet.get('steps');
      const mostSteps = steps.slice(0, steps.length - 1).map((step, index) => {
        const code = step.get('toCode');
        Ember.Logger.debug({ code, index });
        return browser.tabs.executeScript(tab.id, { code, allFrames: true });
      });
      await RSVP.all(mostSteps);
      const code = steps.get('lastObject.toCode');
      Ember.Logger.debug({ code, index: 'lastObject' });
      await new RSVP.Promise(resolve => window.setTimeout(resolve, 5000));
      await browser.tabs.executeScript(tab.id, { code, allFrames: true });
      faucet.set('lastClaim', new Date());
      return faucet.save();
    } catch (error) {
      Ember.Logger.error(error);
    }
  },
});
