/* eslint-disable no-console */

const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n-----------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {
    // Called whenever there's an error on the server we want to print
    error: err => {
        console.error(chalk.red(err));
    },

    success: (text) => {
        console.log(`${text} ${chalk.green('✓')}`);
    },

    // Called when express.js app starts on given port w/o errors
    appStarted: (port, host, metricLifetime) => {
        console.log(`Server started ! ${chalk.green('✓')}`);
        console.log(`Metric lifetime is ${metricLifetime} seconds`);
        console.log(`
        ${chalk.bold('Access URLs:')}${divider}
        Localhost: ${chalk.magenta(`http://${host}:${port}`)}
        LAN: ${chalk.magenta(`http://${ip.address()}:${port}`)}
        ${divider}
        ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
    },
};

module.exports = logger;