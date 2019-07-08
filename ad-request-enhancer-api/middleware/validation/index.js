/**
 * Archive - Ad Request Enhancer - Coding challenge from an interview in 2018
 * Author: Chadi Cortbaoui
 */
const Joi = require('@hapi/joi');
const geoip = require('geoip-lite');
const GEO_IP_COUNTRY_US_LABEL = require('../../config').constants.GEO_IP_COUNTRY_US_LABEL;

module.exports = {
  validateAdRequest: input => Joi.validate(input, require('./schemas').requestSchema),
  validateAdResponse: input => Joi.validate(input, require('./schemas').responseSchema),
  isValidUSIP: ip => geoip.lookup(ip).country === GEO_IP_COUNTRY_US_LABEL
}