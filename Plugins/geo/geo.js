/**
 * Archive - Ad Request Enhancer - Coding challenge from an interview in 2019
 * Author: Chadi Cortbaoui
 */

// Requirement: have feature-toggle like feature to add/remove plugins at runtime
// --> Simulate have seperate npm modules, without pushing to npm
const geoip = require('geoip-lite');

const addGeoLocationToDeviceObject = (req) => {
    req.body.device = {
        ...req.body.device,
        geo: { country: geoip.lookup(req.body.device.ip).country }
    }
};

module.exports = {
    addGeoLocationToDeviceObject
};