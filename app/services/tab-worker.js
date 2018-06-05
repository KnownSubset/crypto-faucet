/* global browser, chrome */
import Service from '@ember/service';
import RSVP from 'rsvp';

const worker = window.browser || window.chrome;

async function executeStep(step, tab) {
  const properties = step.getProperties('element', 'operation', 'value');
  try {
    properties.command = properties.operation;
    if (properties.operation === 'inject') {
      await RSVP.cast(worker.tabs.executeScript({ file: "/content_scripts/commandExecutor.js", allFrames: true }));
    } else {
      const result = await worker.tabs.sendMessage(tab.id, properties);
      console.debug(result);
      return result;
    }
  } catch (error) {
    console.error(error);
  }
}

async function executeSteps(orderedSteps, tab) {
  for (let ndx in orderedSteps) {
    if (orderedSteps.hasOwnProperty(ndx)) {
      const step = orderedSteps[ndx];
      await executeStep(step, tab);
    }
  }
}

export default Service.extend({
  async run(faucet) {
    try {
      //const [tab] = await worker.tabs.query({ active: true, currentWindow: true });
      const tab = await worker.tabs.create({ active: true, url: faucet.url });
      console.debug(new Date());
      await RSVP.cast(worker.tabs.executeScript({ file: "/content_scripts/commandExecutor.js", allFrames: true }));
      const steps = await faucet.get('steps');
      await executeSteps(steps.sortBy('order').toArray(), tab);
    } catch (error) {
      console.error(error);
    }
  },
});
