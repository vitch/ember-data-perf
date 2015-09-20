import DS from 'ember-data';

export default DS.Model.extend({
  author: DS.belongsTo('json-user', { inverse: 'comments' }),
  post: DS.belongsTo('json-post'),
  text: DS.attr('string')
});
