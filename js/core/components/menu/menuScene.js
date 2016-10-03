import Window_Factions from './factionsWindow';
import Window_MenuCommand from './menuCommandWindow';
import Window_Gold from './goldWindow';
import Window_MenuStatus from './menuStatusWindow';
import Scene_MenuBase from '../../scenes/sceneMenuBase';
// import Scene_Status from './status/statusScene';
import { Handlers, Position, Windows } from '../../decorators';

//-----------------------------------------------------------------------------
// Scene_Menu
//
// The scene class of the menu screen.
//-----------------------------------------------------------------------------

@Windows({
  commandWindow: Window_MenuCommand,
  factionWindow: Window_Factions,
  goldWindow: Window_Gold,
  statusWindow: Window_MenuStatus
})
@Position({
  goldWindow() {
    return {
      x: 0,
      y: Graphics.boxHeight - this.goldWindow.height
    }
  },
  commandWindow() {
    return {
      x: 0,
      y: 0
    }
  },
  factionWindow() {
    return {
      x: this.commandWindow.width,
      y: 0
    }
  },
  statusWindow() {
    return {
      x: this.commandWindow.width,
      y: 0
    }
  }
})
@Handlers({ // command window
  commandWindow: {
    item: 'commandItem',
    skill: 'commandPersonal',
    equip: 'commandPersonal',
    status: 'commandPersonal',
    factions: 'commandFactions',
    formation: 'commandFormation',
    options: 'commandOptions',
    save: 'commandSave',
    gameEnd: 'commandGameEnd',
    cancel: 'popScene'
  }
})
export default class Scene_Menu extends Scene_MenuBase {
  constructor() {
    super();
    super.initialize();
  }

  start() {
    super.start();
    this.statusWindow.refresh();
  }

  commandPersonal() {
    this.statusWindow.setFormationMode(false);
    this.statusWindow.selectLast();
    this.statusWindow.activate();
    this.statusWindow.setHandler('ok', ::this.onPersonalOk);
    this.statusWindow.setHandler('cancel', ::this.onPersonalCancel);
  }

  commandFactions() {
    this.statusWindow.setFormationMode(false);
    this.factionWindow.activate();
    this.factionWindow.setHandler('cancel', () => {
      this.factionWindow.deselect();
      this.commandWindow.activate();
      this.statusWindow.height = this.statusWindow.windowHeight();
      this.statusWindow.width = this.statusWindow.windowWidth();
    });
    this.statusWindow.height = 0;
    this.statusWindow.width = 0;
  }

  commandFormation() {
    this.statusWindow.setFormationMode(true);
    this.statusWindow.selectLast();
    this.statusWindow.activate();
    this.statusWindow.setHandler('ok', ::this.onFormationOk);
    this.statusWindow.setHandler('cancel', ::this.onFormationCancel);
  }

  commandItem() {
    SceneManager.push(Scene_Item);
  }

  commandOptions() {
    SceneManager.push(Scene_Options);
  }

  commandSave() {
    SceneManager.push(Scene_Save);
  }

  commandGameEnd() {
    SceneManager.push(Scene_GameEnd);
  }

  onPersonalOk() {
    switch (this.commandWindow.currentSymbol()) {
    case 'skill':
        SceneManager.push(Scene_Skill);
        break;
    case 'equip':
        SceneManager.push(Scene_Equip);
        break;
    case 'status':
        SceneManager.push(Scene_Status);
        break;
    }
  }

  onPersonalCancel() {
    this.statusWindow.deselect();
    this.commandWindow.activate();
  }

  onFormationOk() {
    var index = this.statusWindow.index();
    var actor = $gameParty.members()[index];
    var pendingIndex = this.statusWindow.pendingIndex();
    if (pendingIndex >= 0) {
        $gameParty.swapOrder(index, pendingIndex);
        this.statusWindow.setPendingIndex(-1);
        this.statusWindow.redrawItem(index);
    } else {
        this.statusWindow.setPendingIndex(index);
    }
    this.statusWindow.activate();
  }

  onFormationCancel() {
    if (this.statusWindow.pendingIndex() >= 0) {
        this.statusWindow.setPendingIndex(-1);
        this.statusWindow.activate();
    } else {
        this.statusWindow.deselect();
        this.commandWindow.activate();
    }
  }
}
