namespace DataTracker {
    export class GoogleMeasurement extends DataTracker.GoogleAnalystic {
        inited: boolean = false;
        disabled: boolean = false;
        requestUrl: string = "https://www.google-analytics.com/collect";
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
            let data = {
                "v": this.version,
                "tid": this.trackingId,
            };

            // type: "pageview"、"screenview"、"event"、"transaction"、"item"、"social"、"exception"、"timing"
            let type = eventInfo["type"] || eventInfo["t"];

            if (eventName) {
                data["ea"] = eventName
                type = "event";
            }
            if (type) {
                data["t"] = type;
            }

            if (this.clientId) {
                data["cid"] = this.clientId
            }
            if (this.userId) {
                data["uid"] = this.userId
            }

            for (let k in eventInfo) {
                if (k === "clientId") { // clientId deviceId uuid duid
                    data["cid"] = eventInfo[k];
                } else if (k === "userId") { // userid openid
                    data["uid"] = eventInfo[k];

                } else if (k === "type") {
                    // don't set again: data["t"] = eventInfo[k];

                    // event
                } else if (k === "category") {
                    data["ec"] = eventInfo[k];
                } else if (k === "label") {
                    data["el"] = eventInfo[k];
                } else if (k === "tag") {
                    data["el"] = eventInfo[k];
                } else if (k === "value") {
                    data["ev"] = eventInfo[k];

                    // other params
                } else if (k === "source") {
                    data["ds"] = eventInfo[k]; // web app
                } else if (k === "referer") {
                    data["dr"] = eventInfo[k]; // http://foobar.com
                } else if (k === "language") {
                    data["ul"] = eventInfo[k]; // en-us zh-cn
                } else if (k === "screen") { // 640x960
                    data["sr"] = eventInfo[k];
                } else if (k === "viewport") { // 600x800
                    data["vp"] = eventInfo[k];

                } else {
                    data[k] = eventInfo[k];
                }
            }

            this.post(data);

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
            // xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
            xhr.setRequestHeader("Accept", "application/json, text/javascript, */*");
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");

            xhr.send(queryString);
        }

        timing(info) {
            let data = {
                "type": "timing"
            };
            if (info['category']) {
                data["utc"] = info['category'];
            }
            if (info['label']) {
                data["utl"] = info['label'];
            }
            if (info['name']) {
                data["utv"] = info['name'];
            }
            if (info['time']) {
                data["utt"] = info['time'];
            }
            this.emit(null, data);
        }

        pageview() {
            let data = {
                "type": "pageview",
                "screen": window.innerWidth + "x" + window.innerHeight,
                "sc": "start"
            };

            this.emit(null, data);
        }

        exception(message, fatal) {
            let data = {
                "type": "exception",
                "exd": message,
                "exf": fatal ? 1 : 0,
            };

            this.emit(null, data);
        }
    }
}
