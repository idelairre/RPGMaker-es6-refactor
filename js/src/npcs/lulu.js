import Events from '../events';
import NPC from './npc';

class Lulu extends NPC {
  constructor() {
    super();
    this.name = 'Lulu';
    this.gold = 100;
    this.goldPerDay = 12;
    this.ideology = {
      establishment: -10,
      hierarchical: -10,
      militant: 10,
      popular: 10
    };
    this.knows = {
      Tilly: 5
    };
    this.listenTo(Events, 'nextDay', () => {
      this.gold += this.goldPerDay;
    });
  }

  dialog() {
    const choices = ['Fuck off', 'How much gold do you have?'];
    if (Faction.playerFactionExists) {
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
          $gameMessage.add('Lets make bitches out of bitches');
        }, 1);
      } else if (choice === 1) {
        setTimeout(() => {
          $gameMessage.newPage();
          $gameMessage.add(`I have ${this.gold} gold`);
        }, 1);
      } else {
        setTimeout(() => {
          $gameMessage.add('Ure a silly cunt');
        }, 1);
      }
    });
  }
}

const lulu = new Lulu();

export default lulu;
