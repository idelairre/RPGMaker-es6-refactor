import Window_Selectable from '../../windows/selectable';

export default class Window_Factions extends Window_Selectable {
  constructor(x, y) {
    super();
    this.initialize(x, y);
    this.factions = Faction.factions;
    this.refresh();
  }

  initialize(x, y) {
    const width = this.windowWidth();
    const height = this.windowHeight();
    super.initialize(x, y, width, height);
  }

  windowWidth() {
    return Graphics.boxWidth - 240;
  }

  windowHeight() {
    return Graphics.boxHeight;
  }

  refresh() {
    this.contents.clear();
    this.factions.forEach((item, index) => {
      const rect = super.itemRect(index);
      rect.width -= super.textPadding();
      super.drawTextEx(`${item.name}\nmembers: ${item.npcs.length}\ngold: ${item.gold}`, rect.x, rect.y, rect.width);
    });
  }

  open() {
    this.refresh();
    super.open();
  }
}
