import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const store = this.get('store');
    return window.$.ajax('blog-json-api.json').then(function(data) {
      const startTime = Date.now();
      store.push(data);
      return {
        timeTaken: Date.now() - startTime
      };
    });
  }
});
