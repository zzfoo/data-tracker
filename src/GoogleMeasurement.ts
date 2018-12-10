namespace DataTracker {
    export class GoogleMeasurement extends DataTracker.GoogleAnalystic {
        inited: boolean = false;
        disabled: boolean = false;
        requestUrl: string = "http://www.google-analytics.com/collect";
        version: string = "1";
        clientId!: string;
        userId!: string;
        customMap!: object;
        dimensionMap: object = {};
        metricMap: object = {};
        queue: Array<any> = [];

        constructor(public trackingId, public configData) {
            super(trackingId, configData);
            this.clientId = configData.clientId;
            this.userId = configData.userId;
            this.customMap = configData["custom_map"];
        }

        init(callback) {
            if (this.disabled) {
                callback && callback(false);
                return false;
            }

            let key: string;
            for (key in this.customMap) {
                const paramName: string = this.customMap[key];
                if (key.indexOf("dimension") === 0) {
                    const cdIndex = "cd" + key.substring(9);
                    this.dimensionMap[paramName] = cdIndex;
                } else if (key.indexOf("metric") === 0) {
                    const cmIndex = "cm" + key.substring(6);
                    this.metricMap[paramName] = cmIndex;
                }
            }
        }

        emit(eventName, eventInfo?) {
            if (this.disabled) {
                return false;
            }
            eventInfo = eventInfo || {};
            var info = {
                "ea": eventName
            };
            for (let k in eventInfo) {
                if (k === "category") {
                    info["ec"] = eventInfo[k];
                } else if (k === "label") {
                    info["el"] = eventInfo[k];
                } else if (k === "tag") {
                    info["el"] = eventInfo[k];
                } else if (k === "value") {
                    info["ev"] = eventInfo[k];

                } else if (k === "referer") {
                    info["dr"] = eventInfo[k]; // http://foobar.com
                } else if (k === "language") {
                    info["ul"] = eventInfo[k]; // en-us zh-cn
                } else if (k === "screen") { // 640x960
                    info["sr"] = eventInfo[k];
                } else if (k === "viewport") { // 600x800
                    info["vp"] = eventInfo[k];
                } else {
                    info[k] = eventInfo[k];
                }
            }

            this.post(info);

            return true;
        }

        post(data) {
            const method = "POST";
            const url = this.requestUrl;
            const async = true;

            let queryString = "";
            for (let k in data) {
                queryString += '&' + encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
            }
            queryString = queryString.substring(1);

            const xhr = new XMLHttpRequest();
            xhr.open(method, url, async);
            xhr.withCredentials = true;
            xhr.setRequestHeader("Accept", "application/json, text/javascript, */*");
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");

            xhr.send(queryString);
        }

        pageview() {
            this.emit("pageview", {
                "screen": window.innerWidth + "x" + window.innerHeight
            });
        }

        exception(message, fatal) {
            let info = {
                "exd": message,
                "exf": fatal ? 1 : 0,
            };

            this.post(info);
        }
    }
}
