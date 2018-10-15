'use strict';

export class BaseDataTrackerManager {
    constructor (public dataTracker: DataTracker) {

    }
    init (callback) {
        this.dataTracker.init(callback);
    }

    emit (eventName, eventInfo) {
        this.dataTracker.emit(eventName, eventInfo);
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

    exception(message?) {
        this.dataTracker.exception(message);
    }
}

export interface DataTracker {
    init (callback)

    emit (eventName, eventInfo?)

    pageview()

    login(channel?)

    signUp(channel?)

    exception(message?)
}
