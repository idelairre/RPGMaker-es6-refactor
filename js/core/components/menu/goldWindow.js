import Window_Base from '../../windows/base';

//-----------------------------------------------------------------------------
// Window_Gold
//
// The window for displaying the party's gold.
//-----------------------------------------------------------------------------

export default class Window_Gold extends Window_Base {
  constructor(x, y) {
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

  refresh() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    super.drawCurrencyValue(this.value(), this.currencyUnit(), x, 0, width);
  }

  value() {
    return $gameParty.gold();
  }

  currencyUnit() {
    return TextManager.currencyUnit;
  }

  open() {
    this.refresh();
    super.open();
  }
}
