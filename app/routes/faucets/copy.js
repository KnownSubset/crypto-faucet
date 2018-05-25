import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('faucet', params.clone_id);
  },
  async afterModel(model) {
    const steps = await model.get('steps');
    const faucetAttributes = model.toJSON();
    faucetAttributes.lastClaim = model.lastClaim;
    const cloneFaucet = await this.store.createRecord('faucet', faucetAttributes).save();
    steps.map(async step => {
      const stepAttributes = step.toJSON();
      stepAttributes.faucet = cloneFaucet;
      const clonedStep = await this.store.createRecord('step', stepAttributes).save();
      cloneFaucet.get('steps').addObject(clonedStep);
    });
    await cloneFaucet.save();
    this.transitionTo('faucets.edit', cloneFaucet);
  },
});
