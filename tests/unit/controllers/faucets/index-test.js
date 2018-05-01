import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | faucets/index', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:faucets/index');
    assert.ok(controller);
  });
});
