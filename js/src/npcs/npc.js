import EventsEmitter from 'backbone-events-standalone';
import Events from '../events';

const npcs = [];

class NPC {
  constructor() {
    this.bindListeners();
    NPC.addNpc(this);
  }

  static addNpc(npc) {
    npcs.push(npc);
  }

  static get npcs() {
    return npcs;
  }

  static getNpc(name) {
    for (let i = 0; i < npcs.length; i++) {
      if (npcs[i].name && npcs[i].name === name) {
        return npcs[i];
      }
    }
  }

  bindListeners() {
    this.listenTo(Events, 'tick', ::this.updateIdeas);
  }

  getMapData() {
    const { events } = $dataMap;
     for (let i = 0; i < $dataMap.events.length; i++) {
       if (events[i] && events[i].name === this.name) {
         return events[i];
       }
     }
  }

  getEvent() {
    const events = $gameMap._events;
    const data = this.getMapData();
    for (let i = 0; i < $gameMap._events.length; i++) {
      if (events[i] && events[i]._mapId === data.id) {
        return events[i];
      }
    }
  }

  getRelationship(name) {
    return this.knows[name];
  }

  hasRelationship(name) {
    return !!this.knows[name];
  }

  parsePlayerMeta() {
    return $dataActors[1].meta;
  }

  joinFaction(faction) {
    faction.addMember(this);
  }

  updateIdeas() {
    if (!this.knows) {
      return;
    }
    Object.keys(this.knows).forEach(name => {
      const linkStrength = this.getRelationship(name);
      const other = NPC.getNpc(name);

      // update npc ideology values
      // increase target npc's values toward source npc's values by a fraction of the source npc's link strength
      Object.keys(other.ideology).forEach(key => {
        if (other.ideology[key] < 10) {
          other.ideology[key] += 0.01 * linkStrength;
        }
      });
    });
  }
}

Object.assign(NPC.prototype, EventsEmitter);

export default NPC;
