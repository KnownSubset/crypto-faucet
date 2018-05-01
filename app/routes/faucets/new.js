import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.createRecord('faucet').save();
  },
  afterModel(model) {
    this.transitionTo('faucets.faucet', model);
  },
});
