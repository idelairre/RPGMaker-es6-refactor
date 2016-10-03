export default class FactionGold extends Window_Base {
  constructor(x = 0, y = 0) {
    super();
    this.initialize(x, y);
  }

  initialize(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    super.initialize(x, y, width, height);
    this.refresh();
  }

  windowWidth() {
    return 240;
  }

  windowHeight() {
    return this.fittingHeight(1);
  }


  currencyUnit() {
    return TextManager.currencyUnit;
  }

  value() {
    return Faction.getPlayerFaction().gold;
  }

  refresh() {
    const x = this.textPadding();
    const width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    this.drawCurrencyValue(this.value(), this.currencyUnit(), x, 0, width);
  }

  open() {
    this.refresh();
    super.open();
  }
}
