import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  operations: computed(() => ['click','scroll','type']),
  actions: {
    addStep() {
      const faucet = this.model;
      return this.store.createRecord('step', { faucet });
    },
  },
});
