"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DataTracker;
(function (DataTracker) {
    var GoogleMeasurement = /** @class */ (function (_super) {
        __extends(GoogleMeasurement, _super);
        function GoogleMeasurement(trackingId, configData) {
            var _this = _super.call(this, trackingId, configData) || this;
            _this.trackingId = trackingId;
            _this.configData = configData;
            _this.inited = false;
            _this.disabled = false;
            _this.requestUrl = "http://www.google-analytics.com/collect";
            _this.version = "1";
            _this.dimensionMap = {};
            _this.metricMap = {};
            _this.queue = [];
            _this.clientId = configData.clientId;
            _this.userId = configData.userId;
            _this.customMap = configData["custom_map"];
            return _this;
        }
        GoogleMeasurement.prototype.init = function (callback) {
            if (this.disabled) {
                callback && callback(false);
                return false;
            }
            var key;
            for (key in this.customMap) {
                var paramName = this.customMap[key];
                if (key.indexOf("dimension") === 0) {
                    var cdIndex = "cd" + key.substring(9);
                    this.dimensionMap[paramName] = cdIndex;
                }
                else if (key.indexOf("metric") === 0) {
                    var cmIndex = "cm" + key.substring(6);
                    this.metricMap[paramName] = cmIndex;
                }
            }
        };
        GoogleMeasurement.prototype.emit = function (eventName, eventInfo) {
            if (this.disabled) {
                return false;
            }
            eventInfo = eventInfo || {};
            var info = {
                "ea": eventName
            };
            for (var k in eventInfo) {
                if (k === "category") {
                    info["ec"] = eventInfo[k];
                }
                else if (k === "label") {
                    info["el"] = eventInfo[k];
                }
                else if (k === "tag") {
                    info["el"] = eventInfo[k];
                }
                else if (k === "value") {
                    info["ev"] = eventInfo[k];
                }
                else if (k === "referer") {
                    info["dr"] = eventInfo[k]; // http://foobar.com
                }
                else if (k === "language") {
                    info["ul"] = eventInfo[k]; // en-us zh-cn
                }
                else if (k === "screen") { // 640x960
                    info["sr"] = eventInfo[k];
                }
                else if (k === "viewport") { // 600x800
                    info["vp"] = eventInfo[k];
                }
                else {
                    info[k] = eventInfo[k];
                }
            }
            this.post(info);
            return true;
        };
        GoogleMeasurement.prototype.post = function (data) {
            var method = "POST";
            var url = this.requestUrl;
            var async = true;
            var queryString = "";
            for (var k in data) {
                queryString += '&' + encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
            }
            queryString = queryString.substring(1);
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, async);
            xhr.withCredentials = true;
            xhr.setRequestHeader("Accept", "application/json, text/javascript, */*");
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.send(queryString);
        };
        GoogleMeasurement.prototype.pageview = function () {
            this.emit("pageview", {
                "screen": window.innerWidth + "x" + window.innerHeight
            });
        };
        GoogleMeasurement.prototype.login = function (channel) {
            this.emit('login', { method: channel });
        };
        GoogleMeasurement.prototype.signUp = function (channel) {
            this.emit('sign_up', { method: channel });
        };
        GoogleMeasurement.prototype.exception = function (message, fatal) {
            var info = {
                "exd": message,
                "exf": fatal ? 1 : 0,
            };
            this.post(info);
        };
        return GoogleMeasurement;
    }(DataTracker.GoogleAnalystic));
    DataTracker.GoogleMeasurement = GoogleMeasurement;
})(DataTracker || (DataTracker = {}));
