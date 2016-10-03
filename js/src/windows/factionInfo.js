export default class FactionInfo extends Window_Selectable {
  constructor(x = 0, y = 100, height = 100, width = 300) {
    super();
    super.initialize(x, y, height, width);
    this.npcs = Faction.getPlayerFaction().npcs;
    super.activate();
  }

  maxItems() {
    return 12;
  }

  numberWidth() {
    return this.textWidth('000');
  }

  drawItemName(item, x, y, width = this.width) {
    if (!item.name) {
      return;
    }
    super.drawText(item.name, x, y, width, 'right');
  }

  drawItem(item, index) {
    const rect = super.itemRect(index);
    rect.width -= super.textPadding();
    this.drawItemName(item, rect.x, rect.y, rect.width);
  }

  refresh() {
    super.createContents();
    this.npcs.forEach((item, index) => this.drawItem(item, index));
  }
}
