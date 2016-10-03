import FactionGoldWindow from '../windows/factionGold';
import FactionInfoWindow from '../windows/factionInfo';

export default class FactionEdit extends Scene_MenuBase {
	constructor(...args) {
		super();
    super.initialize(...args);
	}

  create() {
    super.create();
    this.factionGold = new FactionGoldWindow();
    this.factionInfo = new FactionInfoWindow(this.factionGold.x, this.factionGold.y + 100, 500, 100);
    super.addWindow(this.factionGold);
    super.addWindow(this.factionInfo);
  }

  start() {
    super.start();
    this.factionGold.refresh();
    this.factionInfo.refresh();
  }

  onInputOk() {
    super.popScene();
  }

  update() {
    super.update();
    if (Input.isTriggered('cancel')) {
      SoundManager.playCancel();
      SceneManager.goto(Scene_Map);
    }
		if (Input.isTriggered('ok')) {
			SceneManager.goto(Scene_Map);
		}
  }
}
