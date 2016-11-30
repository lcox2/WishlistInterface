var search = require('');

function amazon(config, params, promise){
    search(config, params,promise);
}
module.exports = amazon;