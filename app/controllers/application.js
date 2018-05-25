import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import Ember from 'ember';


export default Controller.extend({
  router: service(),
  currentRouteName: computed('router.currentRouteName', function(){
    return this.router.currentRouteName;
  }),
  errors: computed(() => ["Example"]),
  init() {
    this._super(...arguments);
    const controller = this;
    /*Ember.onerror = function(error) {
      controller.get('errors').addObject(error);
    };*/
  },
  actions: {
    addFaucet(url ='http://garlicrain.xyz/', address = 'Gep5TSJYJrS3jkMfxDcDgBh3tyye25G2qU', refreshRate = 10000) {
      const faucet = { url, address, refreshRate };
      return this.store.createRecord('faucet', faucet).save();
    },
    download(){},
    upload(){},
    run(){},
    activate(){},
    destroy(faucet){
      return faucet.destroyRecord();
    },
  },
});
