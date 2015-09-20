import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  posts: DS.hasMany('json-post', { inverse: 'author' }),
  comments: DS.hasMany('json-comment', { inverse: 'author' })
});
