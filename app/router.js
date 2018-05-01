import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('faucets', function() {
    this.route('faucet', { path: ':faucet_id' });
    this.route('new');
  });
  this.route('options');
});

export default Router;
