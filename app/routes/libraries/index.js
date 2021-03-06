import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

 model() {
  return this.store.findAll('library');
},

actions: {
  deleteLibrary(library) {
    let confirmation = confirm('Are you sure you want to delete?');

    if (confirmation) {

      library.destroyRecord();

    }
  }
}

});