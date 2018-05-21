import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { all } from 'rsvp';

export default Controller.extend({
  operations: computed(() => ['click','scroll','type']),
  actions: {
    addStep() {
      const faucet = this.model;
      return this.store.createRecord('step', { faucet });
    },
    async save() {
      const faucet = await this.model.save();
      const steps = faucet.get('steps') || [];
      await all(steps.map(step => step.save()));
    },
    async destroy(faucet, step) {
      const steps = faucet.get('steps') || [];
      steps.removeObject(step);
      faucet.save();
      return step.destroyRecord();
    },
    async updateLastClaim([date = new Date()]) {
      const faucet = this.model;
      faucet.set('lastClaim', date);
    },
  },
});
