'use strict';

namespace DataTracker {
    export class BaseDataTrackerManager {
        disabled: boolean = false;
        constructor (public tracker: Tracker) {

        }
        init (callback) {
            if (this.disabled) {
                callback && callback();
                return;
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
            this.tracker.pageview();
        }

        login(channel?) {
            this.tracker.login(channel);
        }

        signUp(channel?) {
            this.tracker.signUp(channel);
        }

        exception(message?: string, fatal?: boolean) {
            this.tracker.exception(message, fatal);
        }

        adLoaded() {
            this.tracker.adLoaded();
        }

        adError() {
            this.tracker.adError();
        }

        adPlay() {
            this.tracker.adPlay();
        }

        adSkipped() {
            this.tracker.adSkipped();
        }

        adComplete() {
            this.tracker.adComplete();
        }

        adClicked() {
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

