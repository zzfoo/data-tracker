"use strict";
var DataTracker;
(function (DataTracker) {
    var GoogleAnalystic = /** @class */ (function () {
        function GoogleAnalystic(trackingId, configData) {
            this.trackingId = trackingId;
            this.configData = configData;
            this.inited = false;
            this.disabled = false;
        }
        GoogleAnalystic.prototype.init = function (callback) {
            if (this.disabled) {
                callback && callback(false);
                return false;
            }
            var Me = this;
            var jsSrc = "https://www.googletagmanager.com/gtag/js?id=";
            jsSrc += this.trackingId;
            this.includeJS(jsSrc, function () {
                Me.inited = true;
                callback && callback(true);
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
                else {
                    info[k] = eventInfo[k];
                }
                // "value": eventInfo["value"],
            }
            return window['gtag']('event', eventName, info);
        };
        GoogleAnalystic.prototype.pageview = function () {
            this.emit("pageview");
        };
        GoogleAnalystic.prototype.login = function (channel) {
            this.emit('login', { method: channel });
        };
        GoogleAnalystic.prototype.signUp = function (channel) {
            this.emit('sign_up', { method: channel });
        };
        GoogleAnalystic.prototype.exception = function (message, fatal) {
            fatal = !!fatal;
            this.emit('exception', {
                'description': message,
                'fatal': false // set to true if the exception is fatal
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
        return GoogleAnalystic;
    }());
    DataTracker.GoogleAnalystic = GoogleAnalystic;
})(DataTracker || (DataTracker = {}));
