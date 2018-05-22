import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  tabWorker: service(),
  actions: {
    addFaucet(url ='http://garlicrain.xyz/', address = 'Gep5TSJYJrS3jkMfxDcDgBh3tyye25G2qU', refreshRate = 10000) {
      return this.store.createRecord('faucet', { url, address, refreshRate }).save();
    },
    download(){
    },
    upload(){},
    run(faucet){
      return this.tabWorker.run(faucet);
    },
    activate(){},
    destroy(faucet){
      return faucet.destroyRecord();
    },
  },
});
