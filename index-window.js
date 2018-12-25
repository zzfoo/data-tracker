"use strict";
var BaseDataTrackerManager = require('./build/DataTracker.js').BaseDataTrackerManager;
var GoogleAnalystic = require('./build/GoogleAnalystic.js').GoogleAnalystic;
var GoogleMeasurement = require('./build/GoogleMeasurement.js').GoogleMeasurement;
window['DataTracker'] = module.exports = {
    BaseDataTrackerManager: BaseDataTrackerManager,
    GoogleAnalystic: GoogleAnalystic,
    GoogleMeasurement: GoogleMeasurement,
};