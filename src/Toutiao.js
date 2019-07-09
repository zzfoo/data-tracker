"use strict"
function Toutiao(configData) {
  this.platform = configData.platform || window['tt']
  this.inited = false;
  this.disabled = false;
}

Toutiao.prototype.init = function (callback) {
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

Toutiao.prototype.emit = function (eventName, eventInfo) {
  if (this.diabled) {
    return false
  }

  this.platform.reportAnalytics(eventName, eventInfo)
}

Toutiao.prototype.pageview = function () {
  this.emit('pageview');
};
Toutiao.prototype.login = function (channel) {
  this.emit('login', { 'method': channel });
};
Toutiao.prototype.signUp = function (channel) {
  this.emit('sign_up', { 'method': channel });
};
Toutiao.prototype.exception = function (message, fatal) {
  fatal = !!fatal;
  this.emit('exception', {
      'description': message,
      'fatal': fatal // set to true if the exception is fatal
  });
};
Toutiao.prototype.adLoaded = function () {
  this.emit("adLoaded");
};
Toutiao.prototype.adError = function () {
  this.emit("adError");
};
Toutiao.prototype.adPlay = function () {
  this.emit("adPlay");
};
Toutiao.prototype.adSkipped = function () {
  this.emit("adSkipped");
};
Toutiao.prototype.adComplete = function () {
  this.emit("adComplete");
};
Toutiao.prototype.adClicked = function () {
  this.emit("adClicked");
};

module.exports = Toutiao;
