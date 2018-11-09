'use strict';

export class BaseDataTrackerManager {
    constructor (public dataTracker: DataTracker) {

    }
    init (callback) {
        this.dataTracker.init(callback);
    }

    emit (eventName, eventInfo?) {
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

    adPlay() {
        this.dataTracker.adPlay();
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
}
