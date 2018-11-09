import { DataTracker } from "./DataTracker";

export class GoogleAnalystic implements DataTracker {
    inited: boolean = false;
    constructor (public trackingId, public configData) {
    }
    init(callback) {
        const Me = this;

        var jsSrc = /* <str> */ "https://www.googletagmanager.com/gtag/js?id=" /* </str> */;

        jsSrc += this.trackingId;

        this.includeJS(jsSrc, function () {

            Me.inited = true;

            callback && callback();
        });

        window['dataLayer'] = window['dataLayer'] || [];

        window['gtag'] = function () {
            window['dataLayer'].push(arguments);
        };

        window['gtag']('js', new Date());

        window['gtag']('config', this.trackingId, this.configData);

        // gtag('event', <action>, {
        //   'event_category': <category>,
        //   'event_label': <label>,
        //   'value': <value>
        // });

        Me.emit = function (eventName, eventInfo) {
            eventInfo = eventInfo || {};
            var info = {};
            for (var k in eventInfo) {
                if (k === "category") {
                    info["event_category"] = eventInfo[k];
                } else if (k === "label") {
                    info["event_label"] = eventInfo[k];
                } else if (k === "tag") {
                    info["event_label"] = eventInfo[k];
                } else {
                    info[k] = eventInfo[k];
                }
                // "value": eventInfo["value"],
            }
            window['gtag']('event', eventName, info);
        };
    }

    includeJS(src, onload, onerror?) {

        const head = document.getElementsByTagName("head")[0] || document.documentElement;
        const script: any = document.createElement("script");

        head.insertBefore(script, head.firstChild);
        script.async = true;
        script.src = src;

        let done = false;
        script.onload = script.onreadystatechange = function(event) {
            if (!done &&
                (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                done = true;
                if (onload) {
                    onload(event);
                }
            }
        };
        script.onerror = function(event) {
            if (onerror) {
                onerror(event);
            }
        };
        return script;
    }

    emit(eventName, eventInfo?) {
        eventInfo = eventInfo || {};
        var info = {};
        for (var k in eventInfo) {
            if (k === "category") {
                info["event_category"] = eventInfo[k];
            } else if (k === "label") {
                info["event_label"] = eventInfo[k];
            } else if (k === "tag") {
                info["event_label"] = eventInfo[k];
            } else {
                info[k] = eventInfo[k];
            }
            // "value": eventInfo["value"],
        }
        window['gtag']('event', eventName, info);
    };

    pageview() {
        window['gtag']('event', "pageview");
    }

    login(channel) {
        window['gtag']('event', 'login', { method: channel });
    }

    signUp(channel) {
        window['gtag']('event', 'sign_up', { method: channel });
    }

    exception(message, fatal) {
        fatal = !!fatal;
        window['gtag']('event', 'exception', {
            'description': message,
            'fatal': false // set to true if the exception is fatal
        });
    }

    adLoaded() {
        window['gtag']('event', "adLoaded");
    }

    adError() {
        window['gtag']('event', "adError");
    }

    adPlay() {
        window['gtag']('event', "adPlay");
    }

    adSkipped() {
        window['gtag']('event', "adSkipped");
    }

    adComplete() {
        window['gtag']('event', "adComplete");
    }

    adClicked() {
        window['gtag']('event', "adClicked");
    }
}