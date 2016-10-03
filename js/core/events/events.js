import EventsEmitter from 'backbone-events-standalone';

const Events = Object.assign({}, EventsEmitter);

Events.once('dataManager:isLoaded', () => console.log('DataManager loaded'));

export default Events;
