namespace DataTracker {
    export class GoogleAnalystic implements DataTracker.Tracker {
        inited: boolean = false;
        constructor (public trackingId, public configData) {
        }
        init(callback) {
            const Me = this;
            var jsSrc = "https://www.googletagmanager.com/gtag/js?id=";
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
        }

        includeJS(src, onload?, onerror?) {
            const script = document.createElement("script");
            script.async = true;

            let done = false;
            script.onload = function(event) {
                if (done) {
                    return;
                }
                done = true;
                if (onload) {
                    onload(event);
                }
            };
            script.onerror = function(event) {
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
        }

        pageview() {
            this.emit("pageview");
        }

        login(channel) {
            this.emit('login', { method: channel });
        }

        signUp(channel) {
            this.emit('sign_up', { method: channel });
        }

        exception(message, fatal) {
            fatal = !!fatal;
            this.emit('exception', {
                'description': message,
                'fatal': false // set to true if the exception is fatal
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
}
