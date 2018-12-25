'use strict';
function BaseDataTrackerManager(tracker) {
    this.tracker = tracker;
    this.disabled = false;
}
BaseDataTrackerManager.prototype.init = function (callback) {
    if (this.disabled) {
        callback && callback(false);
        return false;
    }
    this.tracker.init(callback);
};
BaseDataTrackerManager.prototype.emit = function (eventName, eventInfo) {
    if (this.disabled) {
        return false;
    }
    this.tracker.emit(eventName, eventInfo);
    this.onEmit(eventName, eventInfo);
};
BaseDataTrackerManager.prototype.onEmit = function (eventName, eventInfo) {
};
BaseDataTrackerManager.prototype.pageview = function () {
    if (this.disabled) {
        return false;
    }
    this.tracker.pageview();
};
BaseDataTrackerManager.prototype.login = function (channel) {
    if (this.disabled) {
        return false;
    }
    this.tracker.login(channel);
};
BaseDataTrackerManager.prototype.signUp = function (channel) {
    if (this.disabled) {
        return false;
    }
    this.tracker.signUp(channel);
};
BaseDataTrackerManager.prototype.exception = function (message, fatal) {
    if (this.disabled) {
        return false;
    }
    this.tracker.exception(message, fatal);
};
BaseDataTrackerManager.prototype.adLoaded = function () {
    if (this.disabled) {
        return false;
    }
    this.tracker.adLoaded();
};
BaseDataTrackerManager.prototype.adError = function () {
    if (this.disabled) {
        return false;
    }
    this.tracker.adError();
};
BaseDataTrackerManager.prototype.adPlay = function () {
    if (this.disabled) {
        return false;
    }
    this.tracker.adPlay();
};
BaseDataTrackerManager.prototype.adSkipped = function () {
    if (this.disabled) {
        return false;
    }
    this.tracker.adSkipped();
};
BaseDataTrackerManager.prototype.adComplete = function () {
    if (this.disabled) {
        return false;
    }
    this.tracker.adComplete();
};
BaseDataTrackerManager.prototype.adClicked = function () {
    if (this.disabled) {
        return false;
    }
    this.tracker.adClicked();
};
module.exports = BaseDataTrackerManager;