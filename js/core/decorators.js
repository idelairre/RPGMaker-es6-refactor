import { camelCase, difference, pick, omit } from 'lodash';
import 'reflect-metadata';

export function Commands(commands) {
  return function(target) {
    target.prototype.addOriginalCommands = function() {
      for (const key in commands) {
        this.addCommand(commands[key], camelCase(commands[key]), true);
      }
    }
  }
}

export function drawText(sprite, args) {
  const paramNames = ['text', 'position', 'maxWidth', 'lineHeight', 'alignment'];
  const missing = difference(paramNames, Object.keys(pick(args, paramNames)));
  if (missing.length > 0) {
    throw new Error(`Missing parameters ${missing}`);
  }
  const { text, position, maxWidth, lineHeight, alignment } = args;
  args = omit(args, paramNames);
  Object.keys(args).forEach(key => {
    sprite.bitmap[key] = args[key];
  });
  sprite.bitmap.drawText(text, position.x, position.y, maxWidth, lineHeight, alignment);
}

export function Position(windows) {
  return function(target) {
    target.prototype.positionWindows = function() {
      Object.keys(windows).forEach(window => {
        if (typeof windows[window] === 'function') {
            const { x, y } = windows[window].call(this);
            this[window].x = x;
            this[window].y = y;
        } else {
          this[window].x = windows[window].x;
          this[window].y = windows[window].y;
        }
      });
    }
  }
}

export function Windows(windows) {
  return function(target) {
    const create = target.prototype.create;
    target.prototype.create = function () {
      create.call(this);
      Object.keys(windows).forEach(window => {
        const windowInstance = new windows[window]();
        this[window] = windowInstance;
        this.addWindow(windowInstance);
      });
      if (typeof this.afterCreate === 'function') {
        this.afterCreate();
      }
      if (typeof this.positionWindows === 'function') {
        this.positionWindows();
      }
    }
  }
}

export function Handlers(handlers) {
  return function(target) {
    target.prototype.afterCreate = function () {
      Object.keys(handlers).forEach(handler => {
        if (typeof handlers[handler] !== 'string') { // its a hash with the target window as a root
          const window = handler;
          const handlerHash = handlers[handler];
          Object.keys(handlerHash).forEach(_handler => {
            this[window].setHandler(_handler, ::this[handlerHash[_handler]]);
          });
        } else {
          // if the user didn't specify a window, than find a window with those handler symbols
          Object.keys(this).forEach(func => {
            if (this[func] === null) {
              return;
            }
            if ({}.hasOwnProperty.call(this[func], '_handlers')) {
              if (typeof this[func].findSymbol !== 'function') {
                return;
              }
              if (this[func].findSymbol(handler) !== -1) {
                this[func].setHandler(handler, ::this[handlers[handler]]);
              }
            }
          });
        }
      });
    }
  }
}
