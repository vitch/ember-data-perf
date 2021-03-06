import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const store = this.get('store');
    return window.$.ajax('blog-rest.json').then(function(data) {
      const startTime = Date.now();
      Object.keys(data).forEach(function(type) {
        let thisData = {};
        thisData[type] = data[type];
        store.pushPayload(type, thisData);
      });
      return {
        timeTaken: Date.now() - startTime
      };
    });
  }
});
