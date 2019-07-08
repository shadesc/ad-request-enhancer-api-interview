/**
 * Archive - Ad Request Enhancer - Coding challenge from an interview in 2018
 * Author: Chadi Cortbaoui
 */
const api = {
    SERVICE_BASE_URL: 'http://159.89.185.155:3000/api',
    routes: {
        PUBLISHER: '/publishers/find',
        DEMOGRAPHICS: (SITE_ID) => `/sites/${SITE_ID}/demographics`
    }
};

const constants = {
    RESPONSE: 'Response',
    REQUEST: 'Request',
    GEO_IP_COUNTRY_US_LABEL: 'US'
};

const validationExceptionObject = (type, error) => ({ error: `${type} Validation Error`, details: error.details });

module.exports = {
    api,
    constants,
    validationExceptionObject
}