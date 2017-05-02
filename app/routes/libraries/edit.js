import Ember from 'ember';

export default Ember.Route.extend({

  isClicked: false,
  _transitioning: false,
  
  waitConfirmation() {
    return new Promise((resolve, reject) => {
      console.log("Wait");
      resolve(true);
    });
  },

  model(params) {
    return this.store.findRecord('library', params.library_id);
  },

  actions: {
    saveLibrary(newLibrary) {
      newLibrary.save().then(() => this.transitionTo('libraries'));

    },

    isClicked() {
      this.set('isClicked', true);
    },


    willTransition(transition) {

      let model = this.controller.get('model');
      let isClicked = this.get('isClicked');

    //   if (model.get('hasDirtyAttributes')) {
    //     $('#transitionModal').modal('show');        
    //     if (isClicked) {
    //      model.rollbackAttributes();
    //    } else {
    //     this.set('isClicked', false);
    //     transition.abort();
    //   }
    // }  

    if(!_transitioning){
      $("#transitionModal").modal({
        resizable: false,
        modal: true,
        draggable: false,
        buttons: {
          "Confirm": function() {
            self._transitioning = true;
            transition.retry().then(self._transitioning = false);
            $(this).modal( "hide" );
          },
          "Cancel": function() {
            transition.abort();
            $(this).modal( "hide" );
          }
        }
      });
    }    
  }

}
});
