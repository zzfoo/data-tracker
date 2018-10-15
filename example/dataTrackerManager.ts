import { GoogleAnalystic } from "../src/GoogleAnalystic";
import { BaseDataTrackerManager } from "../src/DataTracker";

enum CustomDataTrackerEvent {
    Pause = 'pause',
}

class DataTrackerManager extends BaseDataTrackerManager {

    pause() {
        this.dataTracker.emit(CustomDataTrackerEvent.Pause, {
            
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
