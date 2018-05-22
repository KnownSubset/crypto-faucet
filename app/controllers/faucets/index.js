import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    addFaucet(url ='http://garlicrain.xyz/', address = 'Gep5TSJYJrS3jkMfxDcDgBh3tyye25G2qU', refreshRate = 10000) {
      return this.store.createRecord('faucet', { url, address, refreshRate }).save();
    },
    download(){
    },
    upload(){},
    run(){},
    activate(){},
    destroy(faucet){
      return faucet.destroyRecord();
    },
  },
});
