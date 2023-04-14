const eventBus = {
  events: {},
  subscribe(event : string, callback : Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  },
  unsubscribe(event : string, callback : Function) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(function(cb : Function) { cb !== callback});
    }
  },
  notify(event : string, data : Function) {
    if (this.events[event]) {
      this.events[event].forEach(function(callback : Function) { callback(data) });
    }
  },
};

export default eventBus;