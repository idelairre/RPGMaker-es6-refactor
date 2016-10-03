import EventsEmitter from 'backbone-events-standalone';

const Events = Object.assign({}, EventsEmitter);

Events.on('nextDay', () => $gameMessage.add('new day'));

Events.on('tick', () => console.log('tick', hours));

// document.addEventListener('keydown', e => {
// 	if (e.keyCode === 220) {
//     e.preventDefault();
//     hours += hours % 24;
//     $gameVariables.setValue(1, hours);
// 		Events.trigger('nextDay');
// 	}
// });
//
// let hours = 20;
//
// if ($gameVariables) {
//   $gameVariables.setValue(1, hours);
// }
//
// setInterval(() => {
//   hours++;
//   $gameVariables.setValue(1, hours);
//   Events.trigger('tick');
//   if (hours % 24 === 0) {
//     Events.trigger('nextDay');
//   }
// }, 10000);


export default Events;
