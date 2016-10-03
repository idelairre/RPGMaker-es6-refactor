import FactionNameWindow from '../windows/factionName';

export default class FactionCreate extends Scene_MenuBase {
	constructor(...args) {
		super();
    super.initialize(...args);
	}

  create() {
    super.create();
    this.factionName = new FactionNameWindow();
		this.factionName.setHandler('ok', ::this.onInputOk);
    super.addWindow(this.factionName);
  }

  start() {
    super.start();
    this.factionName.refresh();
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
			this.factionName.setName();
      new Faction(this.factionName.faction);
			SceneManager.goto(Scene_Map);
		}
  }
}
