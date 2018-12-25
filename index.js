"use strict";
var BaseDataTrackerManager = require('./src/DataTracker.js');
var GoogleAnalystic = require('./src/GoogleAnalystic.js');
var GoogleMeasurement = require('./src/GoogleMeasurement.js');
module.exports = {
    BaseDataTrackerManager: BaseDataTrackerManager,
    GoogleAnalystic: GoogleAnalystic,
    GoogleMeasurement: GoogleMeasurement,
};