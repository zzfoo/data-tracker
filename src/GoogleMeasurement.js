"use strict";

var GoogleAnalystic = require('./GoogleAnalystic.js');
function GoogleMeasurement(trackingId, configData, requestUrl) {
    if (!requestUrl) { requestUrl = "https://www.google-analytics.com/collect"; }
    GoogleAnalystic.call(this, trackingId, configData);
    this.trackingId = trackingId;
    this.configData = configData;
    this.requestUrl = requestUrl;
    this.inited = false;
    this.disabled = false;
    // requestUrl: string = "https://www.google-analytics.com/collect";
    this.version = "1";
    this.dimensionMap = {};
    this.metricMap = {};
    this.queue = [];
    this.clientId = configData.clientId;
    this.userId = configData.userId;
    this.customMap = configData["custom_map"];
}
for (var p in GoogleAnalystic.prototype) {
    GoogleMeasurement.prototype[p] = GoogleAnalystic.prototype[p];
}
GoogleMeasurement.prototype.init = function (callback) {
    if (this.disabled) {
        setTimeout(function() {
            callback && callback(null, false);
        }, 30);
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
    setTimeout(function() {
        callback && callback(null, false);
    }, 30);
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
module.exports = GoogleMeasurement;
