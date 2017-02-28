var fs = require('fs'),
    xpath = require('xpath.js'),
    dom = require('xmldom').DOMParser;

function Xml(opts) {
    if(!(this instanceof(Xml))) {
        return new Xml(opts);
    }

    if(opts.doc) {
        this.doc = new dom().parseFromString(opts.doc)
    }
    else if(opts.src) {
        this.src = opts.src;
        this.doc = new dom().parseFromString(fs.readFileSync(opts.src, 'utf8'))
    }
}


Xml.prototype.select = function select(path) {
    return xpath(this.doc, path);
};

Xml.prototype.src = null;
Xml.prototype.doc = null;

module.exports = Xml;