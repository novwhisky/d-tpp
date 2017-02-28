var fs = require('fs'),
    xpath = require('xpath.js'),
    dom = require('xmldom').DOMParser;

function Xml(opts) {
    if(!(this instanceof(Xml))) {
        return new Xml(opts);
    }

    if(opts.doc) {
        this.document = new dom().parseFromString(opts.doc)
    }
    else if(opts.src) {
        this.src = opts.src;
        this.document = new dom().parseFromString(fs.readFileSync(opts.src, 'utf8'))
    }
}


Xml.prototype.select = function select(path) {
    return xpath(this.document, path);
};

Xml.prototype.src = null;
Xml.prototype.document = null;

module.exports = Xml;