'use strict';

export class BaseDataTrackerManager {
    disabled: boolean = false;
    constructor (public dataTracker: DataTracker) {

    }
    init (callback) {
        if (this.disabled) {
            callback && callback();
            return;
        }
        this.dataTracker.init(callback);
    }

    emit (eventName, eventInfo?) {
        if (this.disabled) {
            return false;
        }
        this.dataTracker.emit(eventName, eventInfo);
        this.onEmit(eventName, eventInfo);
    }

    onEmit (eventName, eventInfo?) {

    }

    pageview() {
        this.dataTracker.pageview();
    }

    login(channel?) {
        this.dataTracker.login(channel);
    }

    signUp(channel?) {
        this.dataTracker.signUp(channel);
    }

    exception(message?: string, fatal?: boolean) {
        this.dataTracker.exception(message, fatal);
    }

    adLoaded() {
        this.dataTracker.adLoaded();
    }

    adError() {
        this.dataTracker.adError();
    }

    adPlay() {
        this.dataTracker.adPlay();
    }

    adSkipped() {
        this.dataTracker.adSkipped();
    }

    adComplete() {
        this.dataTracker.adComplete();
    }

    adClicked() {
        this.dataTracker.adClicked();
    }
}

export interface DataTracker {
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
