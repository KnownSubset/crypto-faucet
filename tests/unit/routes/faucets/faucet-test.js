import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | faucets/faucet', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:faucets/faucet');
    assert.ok(route);
  });
});
