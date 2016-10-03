import Scene_MenuBase from '../../../scenes/sceneBase';
import Window_Status from './statusWindow';
import { Handlers, Windows } from '../../../decorators';

//-----------------------------------------------------------------------------
// Scene_Status
//
// The scene class of the status screen.
//-----------------------------------------------------------------------------

@Windows({
  statusWindow: Window_Status
})
@Handlers({
  cancel: 'popScene',
  pagedown: 'nextActor',
  pageup: 'previousActor'
})
export default class Scene_Status extends Scene_MenuBase {
  constructor() {
    super();
    super.initialize();
  }

  create() {
    super.create();
    this.refreshActor();
  }

  refreshActor() {
    const actor = this.actor();
    this.statusWindow.setActor(actor);
  }

  onActorChange() {
    this.refreshActor();
    this.statusWindow.activate();
  }
}
