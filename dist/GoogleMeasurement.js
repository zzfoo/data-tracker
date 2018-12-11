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
            _this.requestUrl = "https://www.google-analytics.com/collect";
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
            var data = {
                "v": this.version,
                "tid": this.trackingId,
            };
            // type: "pageview"、"screenview"、"event"、"transaction"、"item"、"social"、"exception"、"timing"
            var type = eventInfo["type"] || eventInfo["t"];
            if (eventName) {
                data["ea"] = eventName;
                type = "event";
            }
            if (type) {
                data["t"] = type;
            }
            if (this.clientId) {
                data["cid"] = this.clientId;
            }
            if (this.userId) {
                data["uid"] = this.userId;
            }
            for (var k in eventInfo) {
                if (k === "clientId") { // clientId deviceId uuid duid
                    data["cid"] = eventInfo[k];
                }
                else if (k === "userId") { // userid openid
                    data["uid"] = eventInfo[k];
                }
                else if (k === "type") {
                    // don't set again: data["t"] = eventInfo[k];
                    // event
                }
                else if (k === "category") {
                    data["ec"] = eventInfo[k];
                }
                else if (k === "label") {
                    data["el"] = eventInfo[k];
                }
                else if (k === "tag") {
                    data["el"] = eventInfo[k];
                }
                else if (k === "value") {
                    data["ev"] = eventInfo[k];
                    // other params
                }
                else if (k === "source") {
                    data["ds"] = eventInfo[k]; // web app
                }
                else if (k === "referer") {
                    data["dr"] = eventInfo[k]; // http://foobar.com
                }
                else if (k === "language") {
                    data["ul"] = eventInfo[k]; // en-us zh-cn
                }
                else if (k === "screen") { // 640x960
                    data["sr"] = eventInfo[k];
                }
                else if (k === "viewport") { // 600x800
                    data["vp"] = eventInfo[k];
                }
                else {
                    data[k] = eventInfo[k];
                }
            }
            this.post(data);
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
            // xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
            xhr.setRequestHeader("Accept", "application/json, text/javascript, */*");
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.send(queryString);
        };
        // “pageview”、“screenview”、“event”、“transaction”、“item”、“social”、“exception”、“timing”
        GoogleMeasurement.prototype.timing = function (info) {
            var data = {
                "type": "timing"
            };
            if (info['category']) {
                data["utc"] = info['category'];
            }
            if (info['label']) {
                data["utl"] = info['label'];
            }
            if (info['name']) {
                data["utv"] = info['name'];
            }
            if (info['time']) {
                data["utt"] = info['time'];
            }
            this.emit(null, data);
        };
        GoogleMeasurement.prototype.pageview = function () {
            var data = {
                "type": "pageview",
                "screen": window.innerWidth + "x" + window.innerHeight,
                "sc": "start"
            };
            this.emit(null, data);
        };
        GoogleMeasurement.prototype.exception = function (message, fatal) {
            var data = {
                "type": "exception",
                "exd": message,
                "exf": fatal ? 1 : 0,
            };
            this.emit(null, data);
        };
        return GoogleMeasurement;
    }(DataTracker.GoogleAnalystic));
    DataTracker.GoogleMeasurement = GoogleMeasurement;
})(DataTracker || (DataTracker = {}));
