'use strict';
var DataTracker;
(function (DataTracker) {
    var BaseDataTrackerManager = /** @class */ (function () {
        function BaseDataTrackerManager(tracker) {
            this.tracker = tracker;
            this.disabled = false;
        }
        BaseDataTrackerManager.prototype.init = function (callback) {
            if (this.disabled) {
                callback && callback();
                return;
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
            this.tracker.pageview();
        };
        BaseDataTrackerManager.prototype.login = function (channel) {
            this.tracker.login(channel);
        };
        BaseDataTrackerManager.prototype.signUp = function (channel) {
            this.tracker.signUp(channel);
        };
        BaseDataTrackerManager.prototype.exception = function (message, fatal) {
            this.tracker.exception(message, fatal);
        };
        BaseDataTrackerManager.prototype.adLoaded = function () {
            this.tracker.adLoaded();
        };
        BaseDataTrackerManager.prototype.adError = function () {
            this.tracker.adError();
        };
        BaseDataTrackerManager.prototype.adPlay = function () {
            this.tracker.adPlay();
        };
        BaseDataTrackerManager.prototype.adSkipped = function () {
            this.tracker.adSkipped();
        };
        BaseDataTrackerManager.prototype.adComplete = function () {
            this.tracker.adComplete();
        };
        BaseDataTrackerManager.prototype.adClicked = function () {
            this.tracker.adClicked();
        };
        return BaseDataTrackerManager;
    }());
    DataTracker.BaseDataTrackerManager = BaseDataTrackerManager;
})(DataTracker || (DataTracker = {}));
