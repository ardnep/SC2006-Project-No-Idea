/**
 * @fileoverview Implementation of the Observer-Subscriber (Push) design pattern using an event bus.
 * @module models/EventBus
 */

/**
 * Event bus object that handles subscriptions, unsubscriptions, and notifications.
 * @type {Object}
 * @property {Object} events - An object that stores events as keys and their corresponding callbacks as values.
 * @property {Function} subscribe - A method to subscribe to an event with a callback function.
 * @property {Function} unsubscribe - A method to unsubscribe from an event with a callback function.
 * @property {Function} notify - A method to notify all subscribers of an event with data.
 */
const eventBus = {
  events: {},
  
  /**
   * Subscribe to an event with a callback function.
   * @function
   * @param {string} event - The name of the event to subscribe to.
   * @param {Function} callback - The callback function to be called when the event is triggered.
   */
  subscribe(event: string, callback: Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  },
  
  /**
   * Unsubscribe from an event with a callback function.
   * @function
   * @param {string} event - The name of the event to unsubscribe from.
   * @param {Function} callback - The callback function to be removed from the event's subscribers.
   */
  unsubscribe(event: string, callback: Function) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(function(cb: Function) { return cb !== callback });
    }
  },
  
  /**
   * Notify all subscribers of an event with data.
   * @function
   * @param {string} event - The name of the event to notify.
   * @param {*} data - The data to be passed to the event's subscribers.
   */
  notify(event: string, data: any) {
    if (this.events[event]) {
      this.events[event].forEach(function(callback: Function) { callback(data) });
    }
  },
};

export default eventBus;
