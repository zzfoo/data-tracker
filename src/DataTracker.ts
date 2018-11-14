'use strict';

namespace DataTracker {
    export class BaseDataTrackerManager {
        disabled: boolean = false;
        constructor (public tracker: Tracker) {

        }
        init (callback) {
            if (this.disabled) {
                callback && callback(false);
                return false;
            }
            this.tracker.init(callback);
        }

        emit (eventName, eventInfo?) {
            if (this.disabled) {
                return false;
            }
            this.tracker.emit(eventName, eventInfo);
            this.onEmit(eventName, eventInfo);
        }

        onEmit (eventName, eventInfo?) {

        }

        pageview() {
            if (this.disabled) {
                return false;
            }
            this.tracker.pageview();
        }

        login(channel?) {
            if (this.disabled) {
                return false;
            }
            this.tracker.login(channel);
        }

        signUp(channel?) {
            if (this.disabled) {
                return false;
            }
            this.tracker.signUp(channel);
        }

        exception(message?: string, fatal?: boolean) {
            if (this.disabled) {
                return false;
            }
            this.tracker.exception(message, fatal);
        }

        adLoaded() {
            if (this.disabled) {
                return false;
            }
            this.tracker.adLoaded();
        }

        adError() {
            if (this.disabled) {
                return false;
            }
            this.tracker.adError();
        }

        adPlay() {
            if (this.disabled) {
                return false;
            }
            this.tracker.adPlay();
        }

        adSkipped() {
            if (this.disabled) {
                return false;
            }
            this.tracker.adSkipped();
        }

        adComplete() {
            if (this.disabled) {
                return false;
            }
            this.tracker.adComplete();
        }

        adClicked() {
            if (this.disabled) {
                return false;
            }
            this.tracker.adClicked();
        }
    }

    export interface Tracker {
        init (callback)

        emit (eventName, eventInfo?)

        pageview()

        login(channel?)

        signUp(channel?)

        exception(message?: string, fatal?: boolean)

        adLoaded()

        adError()

        adPlay()

        adSkipped()

        adComplete()

        adClicked()
    }
}

