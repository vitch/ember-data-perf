import DS from 'ember-data';

export default DS.Model.extend({
  author: DS.belongsTo('json-user'),
  title: DS.attr('string'),
  content: DS.attr('string'),
  comments: DS.hasMany('json-comment', { inverse: 'post' })
});
