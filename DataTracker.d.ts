declare namespace DataTracker {
    export class BaseDataTrackerManager {
        tracker: Tracker;
        disabled: boolean;
        constructor(tracker: Tracker);
        init(callback: any): false | undefined;
        emit(eventName: any, eventInfo?: any): false | undefined;
        onEmit(eventName: any, eventInfo?: any): void;
        pageview(): false | undefined;
        login(channel?: any): false | undefined;
        signUp(channel?: any): false | undefined;
        exception(message?: string, fatal?: boolean): false | undefined;
        adLoaded(): false | undefined;
        adError(): false | undefined;
        adPlay(): false | undefined;
        adSkipped(): false | undefined;
        adComplete(): false | undefined;
        adClicked(): false | undefined;
    }

    export interface Tracker {
        init(callback: any): any;
        emit(eventName: any, eventInfo?: any): any;
        pageview(): any;
        login(channel?: any): any;
        signUp(channel?: any): any;
        exception(message?: string, fatal?: boolean): any;
        adLoaded(): any;
        adError(): any;
        adPlay(): any;
        adSkipped(): any;
        adComplete(): any;
        adClicked(): any;
    }

    export class GoogleAnalystic implements Tracker {
        trackingId: any;
        configData: any;
        inited: boolean;
        disabled: boolean;
        constructor(trackingId: any, configData: any);
        init(callback: any): false | undefined;
        includeJS(src: any, onload?: any, onerror?: any): HTMLScriptElement;
        emit(eventName: any, eventInfo?: any): any;
        pageview(): void;
        login(channel: any): void;
        signUp(channel: any): void;
        exception(message: any, fatal: any): void;
        adLoaded(): void;
        adError(): void;
        adPlay(): void;
        adSkipped(): void;
        adComplete(): void;
        adClicked(): void;
    }

    export class GoogleMeasurement extends GoogleAnalystic {
        trackingId: any;
        configData: any;
        requestUrl: string;
        inited: boolean;
        disabled: boolean;
        version: string;
        clientId: string;
        userId: string;
        customMap: object;
        dimensionMap: object;
        metricMap: object;
        queue: Array<any>;
        constructor(trackingId: any, configData: any, requestUrl?: string);
        init(callback: any): false | undefined;
        emit(eventName: any, eventInfo?: any): boolean;
        post(data: any): void;
        timing(info: any): void;
        pageview(): void;
        exception(message: any, fatal: any): void;
    }
}

