import { Tracker } from "./DataTracker";

export class GoogleAnalystic implements Tracker {
    inited: boolean = false;
    disabled: boolean = false;
    constructor(public trackingId, public configData) {
    }
    init(callback) {
        if (this.disabled) {
            callback && callback(false);
            return false;
        }
        const Me = this;
        let jsSrc = "https://www.googletagmanager.com/gtag/js?id=";
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
    }

    includeJS(src, onload?, onerror?) {
        const script = document.createElement("script");
        script.async = true;

        let done = false;
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

        const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
        head.insertBefore(script, head.firstChild);

        script.src = src;

        return script;
    }

    emit(eventName, eventInfo?) {
        if (this.disabled) {
            return false;
        }
        eventInfo = eventInfo || {};
        let info = {};
        for (let k in eventInfo) {
            if (k === "category") {
                info["event_category"] = eventInfo[k];
            } else if (k === "label") {
                info["event_label"] = eventInfo[k];
            } else if (k === "tag") {
                info["event_label"] = eventInfo[k];
            } else if (k === "value") {
                info["value"] = eventInfo[k];
            } else {
                info[k] = eventInfo[k];
            }
        }
        return window['gtag']('event', eventName, info);
    }

    pageview() {
        this.emit('pageview');
    }

    login(channel) {
        this.emit('login', { 'method': channel });
    }

    signUp(channel) {
        this.emit('sign_up', { 'method': channel });
    }

    exception(message, fatal) {
        fatal = !!fatal;
        this.emit('exception', {
            'description': message,
            'fatal': fatal // set to true if the exception is fatal
        });
    }

    adLoaded() {
        this.emit("adLoaded");
    }

    adError() {
        this.emit("adError");
    }

    adPlay() {
        this.emit("adPlay");
    }

    adSkipped() {
        this.emit("adSkipped");
    }

    adComplete() {
        this.emit("adComplete");
    }

    adClicked() {
        this.emit("adClicked");
    }
}
