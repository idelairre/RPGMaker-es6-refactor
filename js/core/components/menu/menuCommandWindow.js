import Window_Command from '../../windows/command';
import { Commands } from '../../decorators';

//-----------------------------------------------------------------------------
// Window_MenuCommand
//
// The window for selecting a command on the menu screen.
//-----------------------------------------------------------------------------

@Commands([
  'Factions'
])
export default class Window_MenuCommand extends Window_Command {

  static _lastCommandSymbol = null;

  constructor(x, y) {
    super();
    super.initialize(x, y);
    this.selectLast();
  }

  static initCommandPosition() {
    Window_MenuCommand._lastCommandSymbol = null;
  }

  windowWidth() {
    return 240;
  }

  numVisibleRows() {
    return this.maxItems();
  }

  makeCommandList() {
    this.addMainCommands();
    this.addFormationCommand();
    this.addOriginalCommands();
    this.addOptionsCommand();
    this.addSaveCommand();
    this.addGameEndCommand();
  }

  addMainCommands() {
    var enabled = this.areMainCommandsEnabled();
    if (this.needsCommand('item')) {
        super.addCommand(TextManager.item, 'item', enabled);
    }
    if (this.needsCommand('skill')) {
        super.addCommand(TextManager.skill, 'skill', enabled);
    }
    if (this.needsCommand('equip')) {
        super.addCommand(TextManager.equip, 'equip', enabled);
    }
    if (this.needsCommand('status')) {
        super.addCommand(TextManager.status, 'status', enabled);
    }
  }

  addFormationCommand() {
    if (this.needsCommand('formation')) {
        var enabled = this.isFormationEnabled();
        this.addCommand(TextManager.formation, 'formation', enabled);
    }
  }

  addOptionsCommand() {
    if (this.needsCommand('options')) {
        var enabled = this.isOptionsEnabled();
        this.addCommand(TextManager.options, 'options', enabled);
    }
  }

  addSaveCommand() {
    if (this.needsCommand('save')) {
        var enabled = this.isSaveEnabled();
        this.addCommand(TextManager.save, 'save', enabled);
    }
  }

  addGameEndCommand() {
    var enabled = this.isGameEndEnabled();
    this.addCommand(TextManager.gameEnd, 'gameEnd', enabled);
  }

  needsCommand(name) {
    var flags = $dataSystem.menuCommands;
    if (flags) {
      switch (name) {
        case 'item':
            return flags[0];
        case 'skill':
            return flags[1];
        case 'equip':
            return flags[2];
        case 'status':
            return flags[3];
        case 'formation':
            return flags[4];
        case 'save':
            return flags[5];
        }
    }
    return true;
  }

  areMainCommandsEnabled() {
      return $gameParty.exists();
  }

  isFormationEnabled() {
      return $gameParty.size() >= 2 && $gameSystem.isFormationEnabled();
  }

  isOptionsEnabled() {
      return true;
  }

  isSaveEnabled() {
      return !DataManager.isEventTest() && $gameSystem.isSaveEnabled();
  }

  isGameEndEnabled() {
      return true;
  }

  processOk() {
      Window_MenuCommand._lastCommandSymbol = this.currentSymbol();
      super.processOk.call(this);
  }

  selectLast() {
      this.selectSymbol(Window_MenuCommand._lastCommandSymbol);
  }
}
