import Scene_Base from '../../scenes/sceneBase';
import Window_TitleCommand from './titleCommandWindow';
import { drawText, Handlers, Windows } from '../../decorators';

@Windows({
  commandWindow: Window_TitleCommand
})
@Handlers({
  newGame: 'commandNewGame',
  continue: 'commandContinue',
  options: 'commandOptions'
})
export default class Scene_Title extends Scene_Base {
  constructor() {
    super();
    super.initialize();
  }

  create() {
    super.create();
    this.createBackground();
    this.createForeground();
    super.createWindowLayer();
  }

  createBackground() {
    this.backSprite1 = new Sprite(ImageManager.loadTitle1($dataSystem.title1Name));
    this.backSprite2 = new Sprite(ImageManager.loadTitle2($dataSystem.title2Name));
    super.addChild(this.backSprite1);
    super.addChild(this.backSprite2);
  }

  createForeground() {
    this.gameTitleSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
    super.addChild(this.gameTitleSprite);
    if ($dataSystem.optDrawTitle) {
      const x = 20;
      const y = Graphics.height / 4;
      drawText(this.gameTitleSprite, {
        text: $dataSystem.gameTitle,
        position: { x, y },
        maxWidth: Graphics.width - x * 2,
        outlineColor: 'black',
        outlineWidth: 8,
        fontSize: 100,
        lineHeight: 48,
        alignment: 'center'
      });
    }
  }

  start() {
    super.start();
    SceneManager.clearStack();
    this.centerSprite(this.backSprite1);
    this.centerSprite(this.backSprite2);
    this.playTitleMusic();
    this.startFadeIn(this.fadeSpeed(), false);
  }

  update() {
    if (!this.isBusy()) {
      this.commandWindow.open();
    }
    super.update();
  }

  isBusy() {
    return this.commandWindow.isClosing() || Scene_Base.prototype.isBusy.call(this);
  }

  terminate() {
    super.terminate();
    SceneManager.snapForBackground();
  }

  centerSprite(sprite) {
    sprite.x = Graphics.width / 2;
    sprite.y = Graphics.height / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
  }

  commandNewGame() {
    DataManager.setupNewGame();
    this.commandWindow.close();
    this.fadeOutAll();
    SceneManager.goto(Scene_Map);
  }

  commandContinue() {
    this.commandWindow.close();
    SceneManager.push(Scene_Load);
  }

  commandOptions() {
    this.commandWindow.close();
    SceneManager.push(Scene_Options);
  }

  playTitleMusic() {
    // AudioManager.playBgm($dataSystem.titleBgm);
    AudioManager.stopBgs();
    AudioManager.stopMe();
  }
}
