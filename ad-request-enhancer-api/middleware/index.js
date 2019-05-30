/**
 * Archive - Ad Request Enhancer - Coding challenge from an interview in 2019
 * Author: Chadi Cortbaoui
 */
const validate = require('./validation');
const { constants, validationExceptionObject } = require('./../config');
const addGeoLocationToDeviceObject = require('../../Plugins/geo/geo').addGeoLocationToDeviceObject;

const validateAdRequest = (req, res, next) => {
    validate.validateAdRequest(req.body)
        .then(() => {
            /**
             * Requirement: If request originates from an IP address outside of the United States, then abort the
             * transaction before calling any internal web services and respond with an error message.
             */
            if (req.body.device && !validate.isValidUSIP(req.body.device.ip)) {
                return Promise.reject({ details: 'Not a US IP' });
            }

            /**
             * Requirement: Allow individual processing units to easily be installed / uninstalled at runtime.
             * For example, check if geo plugin enabled or not and add geolocation if enabled.
             * --> Node's 'global' is used only for demo purpose (not to be used on a real life api)
             */
            if (global.allowedPlugins.includes('geo')) {
                addGeoLocationToDeviceObject(req)
            }
            next()
        }).catch((e) => {
            res.status(403).send(validationExceptionObject(constants.REQUEST, e));
        })
};

module.exports = {
    validateAdRequest
};