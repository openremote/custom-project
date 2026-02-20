const util = require("@openremote/util");

bundles = {
    "index": {
        excludeOr: true
    },
    "index.bundle": {
        excludeOr: true,
    }
};

module.exports = util.generateExports(__dirname);
