/**
 * Archive - Ad Request Enhancer - Coding challenge from an interview in 2019
 * Author: Chadi Cortbaoui
 */

// Schemas definitions which will be used to validate Ad Request
// and Ad Response
const Joi = require('@hapi/joi');

const siteSchema = Joi.object().keys({
    id: Joi.string().required(),
    page: Joi.string().uri().trim().required()
});

const deviceSchema = Joi.object().keys({
    ip: Joi.string().ip().required(),
});

const userSchema = Joi.object().keys({
    id: Joi.string()
});

const demographics = {
    demographics: {
        female_percent: Joi.number().positive(),
        male_percent: Joi.number().positive()
    }
};

/**
 *  Requirement:If the Publisher ID cannot be obtained, then abort the transaction.
 *  ==> schema validation: id required
 */
const publisher = {
    publisher: {
        id: Joi.string().required(),
        name: Joi.string()
    }
};

const geo = {
    geo: {
        country:Joi.string()
    }
};

const requestSchema = Joi.object().keys({
    site: siteSchema,
    device: deviceSchema,
    user: userSchema
});

const responseSchema = Joi.object().keys({
    site: siteSchema.append(demographics).append(publisher),
    device: deviceSchema.append(geo),
    user: userSchema
});

module.exports = {
    requestSchema,
    responseSchema
};