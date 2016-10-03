import Scene_Base from '../../scenes/sceneBase';

export default class Scene_Boot extends Scene_Base {
  constructor() {
    super();
    super.initialize();
    this._startDate = Date.now();
  }

  static loadSystemImages() {
    ImageManager.loadSystem('IconSet');
    ImageManager.loadSystem('Balloon');
    ImageManager.loadSystem('Shadow1');
    ImageManager.loadSystem('Shadow2');
    ImageManager.loadSystem('Damage');
    ImageManager.loadSystem('States');
    ImageManager.loadSystem('Weapons1');
    ImageManager.loadSystem('Weapons2');
    ImageManager.loadSystem('Weapons3');
    ImageManager.loadSystem('ButtonSet');
  }

  create() {
    super.create();
    DataManager.loadDatabase();
    ConfigManager.load();
    this.loadSystemWindowImage();
  }

  loadSystemWindowImage() {
    ImageManager.loadSystem('Window');
  }

  isReady() {
    if (super.isReady()) {
      return DataManager.isDatabaseLoaded() && this.isGameFontLoaded();
    } else {
      return false;
    }
  }

  isGameFontLoaded() {
    if (Graphics.isFontLoaded('GameFont')) {
        return true;
    } else {
        var elapsed = Date.now() - this._startDate;
        if (elapsed >= 20000) {
            throw new Error('Failed to load GameFont');
        }
    }
  }

  start() {
    super.start();
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(Scene_Map);
    } else {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Title);
        Window_TitleCommand.initCommandPosition();
    }
    this.updateDocumentTitle();
  }

  updateDocumentTitle() {
    document.title = $dataSystem.gameTitle;
  }

  checkPlayerLocation() {
    if ($dataSystem.startMapId === 0) {
        throw new Error('Player\'s starting position is not set');
    }
  }
}
