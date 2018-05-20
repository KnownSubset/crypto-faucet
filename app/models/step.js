import DS from 'ember-data';

export default DS.Model.extend({
  faucet: DS.belongsTo('faucet'),
  element: DS.attr('string'),
  operation: DS.attr('string'),
});
