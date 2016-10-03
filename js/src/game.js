import EventEmitter from 'backbone-events-standalone';
import Events from './events';
import NPC from './npcs/npc';
import * as NPCS from './npcs';
import FactionCreate from './scenes/factionCreate';
import FactionEdit from './scenes/factionEdit';

export default class Game {
	static day = 0;

	static incrementDay(amt = 1) {
		Game.day += amt;
	}

	static getNpc(name) {
		return NPC.getNpc(name);
	}

	static showFactionDialog() {
		const choices = ['whatever', 'lol', 'create faction'];
		if (Faction.playerFactionExists) {
			choices[2] = 'edit faction';
      choices.push('faction info');
		}
		$gameMessage.add('What do you want to do?');
		$gameMessage.setChoices(choices, 0, -1);

		$gameMessage.setChoiceCallback(choice => {
			if (choice === 2) {
			  SceneManager.goto(FactionCreate);
			} else if (choice === 3) {
        SceneManager.goto(FactionEdit);
      }
		});
	}
}

Object.assign(Game, EventEmitter);

Game.listenTo(Events, 'nextDay', Game.incrementDay);

window.NPC = NPC;
