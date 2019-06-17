"use strict"
function Ald(configData) {
  this.platform = configData.platform || window['wx']
  this.inited = false;
  this.disabled = false;
}

Ald.prototype.init = function (callback) {
  if (this.disabled) {
    setTimeout(function () {
      callback && callback(null, false);
    }, 30);
    return false;
  }

  var Me = this
  setTimeout(function () {
    Me.inited = true
    callback && callback(null, true);
  }, 30);
}

Ald.prototype.emit = function (eventName, eventInfo) {
  if (this.diabled) {
    return false
  }

  this.platform.aldSendEvent(eventName, eventInfo)
}

Ald.prototype.pageview = function () {
  this.emit('pageview');
};
Ald.prototype.login = function (channel) {
  this.emit('login', { 'method': channel });
};
Ald.prototype.signUp = function (channel) {
  this.emit('sign_up', { 'method': channel });
};
Ald.prototype.exception = function (message, fatal) {
  fatal = !!fatal;
  this.emit('exception', {
      'description': message,
      'fatal': fatal // set to true if the exception is fatal
  });
};
Ald.prototype.adLoaded = function () {
  this.emit("adLoaded");
};
Ald.prototype.adError = function () {
  this.emit("adError");
};
Ald.prototype.adPlay = function () {
  this.emit("adPlay");
};
Ald.prototype.adSkipped = function () {
  this.emit("adSkipped");
};
Ald.prototype.adComplete = function () {
  this.emit("adComplete");
};
Ald.prototype.adClicked = function () {
  this.emit("adClicked");
};

module.exports = Ald;
