var Xml = require('../xml');

function AbstractXPathObject(dom) {

    let XPathObject;

    if(dom) {
        XPathObject = Xml({doc: dom});
        this.document = XPathObject.doc.documentElement;
    }
    else {
        XPathObject = {dunno: true};
    }

    return XPathObject;
}

module.exports = AbstractXPathObject;