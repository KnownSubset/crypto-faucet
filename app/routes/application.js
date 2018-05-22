import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    //const garlicFaucets =['http://garlicrain.xyz/', 'https://faucet.garlic.wine/', 'https://faucet.garlicpool.org/index.php', 'https://faucetgarlico.in/', 'https://freegarlico.in/index.html', 'https://garlicoinfaucet.com/free-garlicoin/'];
    //const faucets = garlicFaucets.map((url, index) => createFaucet(index, url, 'Gep5TSJYJrS3jkMfxDcDgBh3tyye25G2qU', Math.floor(Math.random() * 8 * hour)));
    //this.store.pushPayload('faucet', { faucets });
    return this.store.findAll('faucet');
  },
  afterModel(model, transistion){
    if (transistion.targetName === 'index'){
      this.transitionTo('faucets');
    }
  },
});
