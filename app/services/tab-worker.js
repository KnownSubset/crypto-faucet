/* global browser */
import Service from '@ember/service';
import RSVP from 'rsvp';
import Ember from 'ember';

export default Service.extend({
  async run(faucet) {
    try {
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
      //const tab = await browser.tabs.create( { active: true, url: faucet.url });
      const steps = faucet.get('steps');
      steps.mapBy('toCode');
      const code = `
      try {
        window.onload = function() {
          var elem = document.querySelector("input[type='text']");
          console.log({ elem: elem });
          document.querySelector("input[type='text']").value = 'Gep5TSJYJrS3jkMfxDcDgBh3tyye25G2qU';
        }
        var elem2 = document.querySelector("input[type='text']");
        console.log({ elem: elem2 });
        elem2.value = 'Gep5TSJYJrS3jkMfxDcDgBh3tyye25G2qU';
      } catch (err) {
        console.log(err);
      }
    `;
      await new RSVP.Promise(resolve => window.setTimeout(resolve, 1500));
      browser.tabs.executeScript({ code: `console.log('location:', window.location.href);` });
      browser.tabs.executeScript(tab.id, { code, allFrames: true });
      browser.tabs.executeScript(tab.id, { code: `console.log('location2:', window.location.href);` });
    } catch (error) {
      Ember.Logger.error(error);
    }
  },
});
