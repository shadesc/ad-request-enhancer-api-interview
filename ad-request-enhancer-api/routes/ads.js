/**
 * Archive - Ad Request Enhancer - Coding challenge from an interview in 2018
 * Author: Chadi Cortbaoui
 */
const router = require('express').Router();
const axios = require('axios');
const apiConfig = require('./../config').api;
const validateAdResponse = require('./../middleware/validation').validateAdResponse;
const { constants, validationExceptionObject } = require('./../config');

axios.defaults.baseURL = apiConfig.SERVICE_BASE_URL;

// Endpoint that receives incoming ad request and enriches it based on a set
// of requirements.
router.post('/dispatch', async (req, res) => {
    try {
        const enrichedAdd = await enrichAdd(req.body);
        buildResponse(res, enrichedAdd);
    } catch (error) {
        res.status(500).send({ error: 'An error occured - make sure your request is not malformed' });
    }
});

const enrichAdd = async obj => {
    const responses = await callMicroServicesInParallel(obj.site.id);
    responses.forEach(res => {
        if (res.data && res.data.demographics
            && res.data.demographics.pct_female) {
            const pct_female = Math.round(res.data.demographics.pct_female);
            res.data.demographics = {
                'female_percent': pct_female,
                'male_percent': calculatePctMale(res.data.demographics.pct_female)
            };
        }

        obj.site = { ...obj.site, ...res.data }
    });

    return obj;
};

const callMicroServicesInParallel = SITE_ID => axios.all([
    axios.post(apiConfig.routes.PUBLISHER, { "q": { "siteID": "string" } }),
    axios.get(apiConfig.routes.DEMOGRAPHICS(SITE_ID)).catch(() => {
        return { demographics: {}} // if this endpoint fails, app should still run
    })
]);

const calculatePctMale = PCT_FEMALE => Math.round(100 - PCT_FEMALE);

const buildResponse = (res, enrichedAdd) => {
    validateAdResponse(enrichedAdd)
        .then(() => {
            res.send(enrichedAdd)
        }).catch((e) => {
            res.status(403).send(validationExceptionObject(constants.RESPONSE, e))
        })
};

module.exports = router;