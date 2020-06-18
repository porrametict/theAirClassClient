import Vue from 'vue';
export const EventBus = new Vue();

/**
 import {EventBus} form @/event-bus.js

 # call
 EventBus.$emit('my-event-name', param1, param2);


 # receipt

 EventBus.$on('my-event-name', (param1, param2) => {
     console.log('Receive event.', param1, param2);
});
 EventBus.$on('my-event-name', this.myHandlerFunction);

 # close

 EventBus.$off('my-event-name');

 * **/