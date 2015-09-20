import DS from 'ember-data';

export default DS.Model.extend({
  author: DS.belongsTo('user'),
  title: DS.attr('string'),
  content: DS.attr('string'),
  comments: DS.hasMany('comment', { inverse: 'post' })
});
