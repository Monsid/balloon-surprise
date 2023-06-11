'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
    const app = new EmberApp(defaults, {
        sassOptions: {
            implementation: require('sass')
        }
    });

    return app.toTree();
};