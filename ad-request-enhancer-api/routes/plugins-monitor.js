/**
 * Archive - Ad Request Enhancer - Coding challenge from an interview in 2019
 * Author: Chadi Cortbaoui
 */

// Endpoint used to test what plugins are enabled (1) and disabled (0)
// at runtime.
// --> Node's 'global' is used only for demo purpose (not to be used on a real life api)
const router = require('express').Router();
const incomingRuntimeUpdate = require('./../config/plugins').runtimeUpdate;

router.post('/change-runtime-plugins', async(req, res) => {
    incomingRuntimeUpdate(req.body);
    res.send(global.allowedPlugins);
});

router.get('/list-installed-plugins', (req, res) => {
    res.send(global.allowedPlugins);
});

module.exports = router;
