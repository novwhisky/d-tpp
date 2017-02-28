const AbstractXPathObject = require('./abstract-xpath-object');

function state_code() {
    return AbstractXPathObject.apply(this, arguments);
}

module.exports = state_code;