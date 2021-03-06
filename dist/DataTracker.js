(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DataTracker = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var BaseDataTrackerManager = require('./src/BaseDataTrackerManager.js');
var GoogleAnalystic = require('./src/GoogleAnalystic.js');
var GoogleMeasurement = require('./src/GoogleMeasurement.js');
var Ald = require('./src/Ald.js');
var Toutiao = require('./src/Toutiao.js');
module.exports = {
    BaseDataTrackerManager: BaseDataTrackerManager,
    GoogleAnalystic: GoogleAnalystic,
    GoogleMeasurement: GoogleMeasurement,
    Ald: Ald,
    Toutiao: Toutiao,
};

},{"./src/Ald.js":2,"./src/BaseDataTrackerManager.js":3,"./src/GoogleAnalystic.js":4,"./src/GoogleMeasurement.js":5,"./src/Toutiao.js":6}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';
function BaseDataTrackerManager(tracker) {
    this.tracker = tracker;
    this.disabled = false;
}
BaseDataTrackerManager.prototype.init = function (callback) {
    if (this.disabled) {
        setTimeout(function() {
            callback && callback(false);
        }, 30);
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
},{}],4:[function(require,module,exports){
"use strict";
function GoogleAnalystic(trackingId, configData) {
    this.trackingId = trackingId;
    this.configData = configData;
    this.inited = false;
    this.disabled = false;
}
GoogleAnalystic.prototype.init = function (callback) {
    if (this.disabled) {
        setTimeout(function() {
            callback && callback(null, false);
        }, 30);
        return false;
    }
    var Me = this;
    var jsSrc = "https://www.googletagmanager.com/gtag/js?id=";
    jsSrc += this.trackingId;
    this.includeJS(jsSrc, function () {
        Me.inited = true;
        callback && callback(null, true);
    });
    window['dataLayer'] = window['dataLayer'] || [];
    window['gtag'] = function () {
        window['dataLayer'].push(arguments);
    };
    window['gtag']('js', new Date());
    window['gtag']('config', this.trackingId, this.configData);
};
GoogleAnalystic.prototype.includeJS = function (src, onload, onerror) {
    var script = document.createElement("script");
    script.async = true;
    var done = false;
    script.onload = function (event) {
        if (done) {
            return;
        }
        done = true;
        if (onload) {
            onload(event);
        }
    };
    script.onerror = function (event) {
        if (onerror) {
            onerror(event);
        }
    };
    var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    head.insertBefore(script, head.firstChild);
    script.src = src;
    return script;
};
GoogleAnalystic.prototype.emit = function (eventName, eventInfo) {
    if (this.disabled) {
        return false;
    }
    eventInfo = eventInfo || {};
    var info = {};
    for (var k in eventInfo) {
        if (k === "category") {
            info["event_category"] = eventInfo[k];
        }
        else if (k === "label") {
            info["event_label"] = eventInfo[k];
        }
        else if (k === "tag") {
            info["event_label"] = eventInfo[k];
        }
        else if (k === "value") {
            info["value"] = eventInfo[k];
        }
        else {
            info[k] = eventInfo[k];
        }
    }
    return window['gtag']('event', eventName, info);
};
GoogleAnalystic.prototype.pageview = function () {
    this.emit('pageview');
};
GoogleAnalystic.prototype.login = function (channel) {
    this.emit('login', { 'method': channel });
};
GoogleAnalystic.prototype.signUp = function (channel) {
    this.emit('sign_up', { 'method': channel });
};
GoogleAnalystic.prototype.exception = function (message, fatal) {
    fatal = !!fatal;
    this.emit('exception', {
        'description': message,
        'fatal': fatal // set to true if the exception is fatal
    });
};
GoogleAnalystic.prototype.adLoaded = function () {
    this.emit("adLoaded");
};
GoogleAnalystic.prototype.adError = function () {
    this.emit("adError");
};
GoogleAnalystic.prototype.adPlay = function () {
    this.emit("adPlay");
};
GoogleAnalystic.prototype.adSkipped = function () {
    this.emit("adSkipped");
};
GoogleAnalystic.prototype.adComplete = function () {
    this.emit("adComplete");
};
GoogleAnalystic.prototype.adClicked = function () {
    this.emit("adClicked");
};
module.exports = GoogleAnalystic;

},{}],5:[function(require,module,exports){
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

},{"./GoogleAnalystic.js":4}],6:[function(require,module,exports){
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

},{}]},{},[1])(1)
});
