'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var BaseDataTrackerManager = /** @class */ (function () {
    function BaseDataTrackerManager(dataTracker) {
        this.dataTracker = dataTracker;
    }
    BaseDataTrackerManager.prototype.init = function (callback) {
        this.dataTracker.init(callback);
    };
    BaseDataTrackerManager.prototype.emit = function (eventName, eventInfo) {
        this.dataTracker.emit(eventName, eventInfo);
        this.onEmit(eventName, eventInfo);
    };
    BaseDataTrackerManager.prototype.onEmit = function (eventName, eventInfo) {
    };
    BaseDataTrackerManager.prototype.pageview = function () {
        this.dataTracker.pageview();
    };
    BaseDataTrackerManager.prototype.login = function (channel) {
        this.dataTracker.login(channel);
    };
    BaseDataTrackerManager.prototype.signUp = function (channel) {
        this.dataTracker.signUp(channel);
    };
    BaseDataTrackerManager.prototype.exception = function (message, fatal) {
        this.dataTracker.exception(message, fatal);
    };
    BaseDataTrackerManager.prototype.adLoaded = function () {
        this.dataTracker.adLoaded();
    };
    BaseDataTrackerManager.prototype.adError = function () {
        this.dataTracker.adError();
    };
    BaseDataTrackerManager.prototype.adPlay = function () {
        this.dataTracker.adPlay();
    };
    BaseDataTrackerManager.prototype.adSkipped = function () {
        this.dataTracker.adSkipped();
    };
    BaseDataTrackerManager.prototype.adComplete = function () {
        this.dataTracker.adComplete();
    };
    BaseDataTrackerManager.prototype.adClicked = function () {
        this.dataTracker.adClicked();
    };
    return BaseDataTrackerManager;
}());
exports.BaseDataTrackerManager = BaseDataTrackerManager;
