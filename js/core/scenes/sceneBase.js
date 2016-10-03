import Stage from '../stage/stage';

//-----------------------------------------------------------------------------
// Scene_Base
//
// The superclass of all scenes within the game.
//-----------------------------------------------------------------------------

export default class Scene_Base extends Stage {
  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    super.initialize();
    this._active = false;
    this._fadeSign = 0;
    this._fadeDuration = 0;
    this._fadeSprite = null;
  }

  create() { } // called by scene manager

  isActive() {
    return this._active;
  }

  isReady() {
    return ImageManager.isReady();
  }

  start() {
    this._active = true;
  }

  update() {
    this.updateFade();
    this.updateChildren();
    AudioManager.checkErrors();
  }

  stop() {
    this._active = false;
  }

  isBusy() {
    return this._fadeDuration > 0;
  }

  terminate() { }

  createWindowLayer() {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    var x = (Graphics.width - width) / 2;
    var y = (Graphics.height - height) / 2;
    this._windowLayer = new WindowLayer();
    this._windowLayer.move(x, y, width, height);
    this.addChild(this._windowLayer);
  }

  addWindow(window) {
    this._windowLayer.addChild(window);
  }

  startFadeIn(duration, white) {
    this.createFadeSprite(white);
    this._fadeSign = 1;
    this._fadeDuration = duration || 30;
    this._fadeSprite.opacity = 255;
  }

  startFadeOut(duration, white) {
    this.createFadeSprite(white);
    this._fadeSign = -1;
    this._fadeDuration = duration || 30;
    this._fadeSprite.opacity = 0;
  }

  createFadeSprite(white) {
    if (!this._fadeSprite) {
          this._fadeSprite = new ScreenSprite();
          this.addChild(this._fadeSprite);
    }
    if (white) {
        this._fadeSprite.setWhite();
    } else {
        this._fadeSprite.setBlack();
    }
  }

  updateFade() {
    if (this._fadeDuration > 0) {
      var d = this._fadeDuration;
      if (this._fadeSign > 0) {
          this._fadeSprite.opacity -= this._fadeSprite.opacity / d;
      } else {
          this._fadeSprite.opacity += (255 - this._fadeSprite.opacity) / d;
      }
      this._fadeDuration--;
    }
  }

  updateChildren() {
    this.children.forEach(child => {
        if (child.update) {
            child.update();
        }
    });
  }

  popScene() {
    SceneManager.pop();
  }

  checkGameover() {
    if ($gameParty.isAllDead()) {
        SceneManager.goto(Scene_Gameover);
    }
  }

  fadeOutAll() {
    var time = this.slowFadeSpeed() / 60;
    AudioManager.fadeOutBgm(time);
    AudioManager.fadeOutBgs(time);
    AudioManager.fadeOutMe(time);
    this.startFadeOut(this.slowFadeSpeed());
  }

  fadeSpeed() {
    return 24;
  }

  slowFadeSpeed() {
    return this.fadeSpeed() * 2;
  }
}
