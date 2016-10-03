import Events from '../events';
import NPC from './npc';

class Tilly extends NPC {
  constructor() {
    super();
    this.name = 'Tilly';
    this.gold = 100;
    this.goldPerDay = 12;
    this.ideology = {
      establishment: -10,
      hierarchical: 0,
      militant: 10,
      popular: -10
    };
    this.knows = {
      Lulu: 10
    };
    this.listenTo(Events, 'nextDay', () => {
      this.gold += this.goldPerDay;
    });
  }

  dialog() {
    const choices = ['Sod off', 'How much gold do you have?'];
    if (Faction.playerFactionExists()) {
      if (!Faction.getPlayerFaction().getMember(this.name)) {
        choices.push('Join my faction');
      }
    }
    $gameMessage.add('Whats up?');
    $gameMessage.setChoices(choices, 0, -1);

    $gameMessage.setChoiceCallback(choice => {
      if (choice === 2) {
        this.joinFaction(Faction.getPlayerFaction());
        setTimeout(() => {
          $gameMessage.newPage();
          $gameMessage.add('Lets arse this house');
        }, 1);
      } else if (choice === 1) {
        setTimeout(() => {
          $gameMessage.newPage();
          $gameMessage.add(`I have ${this.gold} gold`);
        }, 1);
      } else {
        setTimeout(() => {
          $gameMessage.add('Lol, k');
        }, 1);
      }
    });
  }
}

const tilly = new Tilly();

export default tilly;
