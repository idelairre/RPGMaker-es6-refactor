import EventEmitter from 'backbone-events-standalone';

export default class Faction {

  static playerFactionExists = false;

  constructor({
    name,
    isPlayerFaction = false,
    npcs = [],
    ideology = {
      establishment: 0,
      hierarchical: 0,
      militant: 0,
      popular: 0
    },
  } = {}) {
    this.name = name;
    this.isPlayerFaction = isPlayerFaction;
    if (isPlayerFaction && !Faction.playerFactionExists) {
      Faction.playerFactionExists = true;
    } else if (isPlayerFaction) {
      return;
    }
    this.gold = 0;
    this.tithe = 6;
    this.npcs = npcs;
    this.ideology = ideology;
    Faction.factions.push(this);
    this.bindListeners();
  }

  static get factions() {
    return window.Factions;
  }

  static initializeFactions() {
    const parameters = PluginManager.parameters('factions');
    try {
      Faction.listenToOnce(Events, 'dataManager:loaded:factions', () => {
        if (window.Factions && window.Factions.length > 0) {
          window.Factions = window.Factions.map(faction => {
            return new Faction(faction);
          });
        }
      });
      if (typeof parameters.Factions !== 'undefined') {
        DataManager.loadDataFile('Factions', parameters.Factions);
      }
    } catch (err) {
      console.error(err);
    }
  }

  bindListeners() {
    this.listenTo(Events, 'nextDay', ::this.collectTithes);
  }

  collectTithes() {
    this.npcs.forEach(npc => {
      if (npc.gold > this.tithe) {
        npc.gold -= this.tithe;
        this.gold += this.tithe;
      }
    });
    console.log('[FACTION GOLD]', this.gold);
  }

  static getPlayerFaction() {
    if (!Faction.playerFactionExists) {
      return;
    }
    for (let i = 0; i < factions.length; i++) {
      if (factions[i].isPlayerFaction) {
        return factions[i];
      }
    }
    console.log('No player faction');
    return;
  }

  getMember(name) {
    if (this.npcs.length === 0) {
      return;
    }
    for (let i = 0; this.npcs.length; i++) {
      if (this.npcs[i].name && this.npcs[i].name === name) {
        return this.npcs[i];
      }
    }
  }

  addMember(npc) {
    if (this.getMember(npc.name)) {
      return;
    }
    this.npcs.push(npc);
    console.log(npc.name, 'has joined your faction');
  }
}

Object.assign(Faction.prototype, EventEmitter);
Object.assign(Faction, EventEmitter);

Faction.initializeFactions();

window.Faction = Faction;
