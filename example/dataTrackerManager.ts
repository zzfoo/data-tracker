import { GoogleAnalystic } from "../src/GoogleAnalystic";
import { BaseDataTrackerManager } from "../src/DataTracker";

class DataTrackerManager extends BaseDataTrackerManager {

    pause() {
        this.dataTracker.emit('pause', {
        })
    }

}

const trackingId =  "UA-123456789";
const config = {
    'custom_map': {
        'dimension1': 'stage',
        'metric1': 'game_result',
    }
};

window.addEventListener('error', function(event) {
    const { filename, lineno, colno, message } = event;
    // e.g., main.js(120行60列): name is undefined.
    const desc = `${filename}(${lineno}行${colno}列): ${ message }`;
    dataTrackerManager.exception(desc, false);
})

const dataTracker = new GoogleAnalystic(trackingId, config);
const dataTrackerManager = new DataTrackerManager(dataTracker);
dataTrackerManager.init(function(err) {
    if (err) {
        console.log('init error: ', err);
        return;
    }
    console.log('init succeed!');
});
export default dataTrackerManager;
