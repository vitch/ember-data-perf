import DS from 'ember-data';

export default DS.Model.extend({
  author: DS.belongsTo('user', { inverse: 'comments' }),
  post: DS.belongsTo('post'),
  text: DS.attr('string')
});
