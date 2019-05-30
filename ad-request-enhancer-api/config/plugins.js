/**
 * Archive - Ad Request Enhancer - Coding challenge from an interview in 2019
 * Author: Chadi Cortbaoui
 */

// Requirement: Allow individual processing units to easily be installed / uninstalled at runtime.
// --> Simulate plugins aka npm modules and enable feature toggling at run time.
const _ = require('lodash');

// Plugins are installed (1) uninstalled (0)
// --> Can be modified at runtime
let pluginConfig = {
    "geo": 1
}

// Build an array of enabled plugins
const enabledPlugins = () => {
    const enabledPlugins = _.keys(_.pickBy(pluginConfig, item => item === 1))
    return enabledPlugins.length ? enabledPlugins : [];
};

// At runtime, when we send a request to install/uninstall plugin(s)
const runtimeUpdate = update => {
    // handle case of erronous req object and map to only available plugin names(keys)
    update = _.pick(update, _.keys(pluginConfig));

    pluginConfig = { ...pluginConfig, ...update };
    // --> Node's 'global' is used only for demo purpose (not to be used on a real life api)
    global.allowedPlugins = enabledPlugins();
}

// Initiate on app deploy
// --> Node's 'global' is used only for demo purpose (not to be used on a real life api)
global.allowedPlugins = enabledPlugins();

module.exports = {
    enabledPlugins,
    runtimeUpdate
};