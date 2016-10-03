export default class FactionName extends Window_TextInput {
  constructor(faction = Faction.getPlayerFaction() || { name: '', isPlayerFaction: true }, max = 12) {
		super();
    const width = this.windowWidth();
    const height = this.windowHeight();
    const x = (Graphics.boxWidth - width) / 2;
    const y = (Graphics.boxHeight - height) / 2;
    this.faction = faction;
    super.initialize(x, y, width, height);
    super.setDefault(faction.name, max);
    super.activate();
  }

	itemRect(index) {
    return {
      x: this.left() + (index * this.charWidth()),
      y: 54,
      width: super.charWidth(),
      height: super.lineHeight()
    };
  }

	faceWidth() {
    return 144;
  }

	left() {
    const nameCenter = (this.contentsWidth() + this.faceWidth()) / 2;
    const nameWidth = (this._maxLength + 1) * this.charWidth();
    return Math.min(nameCenter - nameWidth / 2, this.contentsWidth() - nameWidth);
  };

	name() {
    return super._text;
  }

	setName() {
		this.faction.name = this._text;
	}

	refresh() {
    super.contents.clear();
    for (let i = 0; i < this._maxLength; i++) {
      super.drawUnderline(i);
    }
    for (let j = 0; j < this._text.length; j++) {
      super.drawChar(j);
    }
    let rect = this.itemRect(this._index);
    super.setCursorRect(rect.x, rect.y, rect.width, rect.height);
  };

	windowWidth() {
    return 480;
  }

	windowHeight() {
    return super.fittingHeight(4);
  }
}
