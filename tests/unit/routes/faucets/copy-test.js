import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | faucets/copy', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:faucets/copy');
    assert.ok(route);
  });
});
