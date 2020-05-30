const appConfig = require('./app');

const defaultConfig = {
    base: '/',
    title: 'ZWave To MQTT'  
};

module.exports = {
    ...defaultConfig,
    ...appConfig
};
