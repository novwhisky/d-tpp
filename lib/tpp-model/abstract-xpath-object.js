var Xml = require('../xml');

function AbstractXPathObject(dom) {

    let XPathObject;

    if(dom) {
        XPathObject = Xml({doc: dom});
        this.document = XPathObject.doc;
    }
    else {
        XPathObject = {dunno: true};
    }

    XPathObject.setCustomKeys = function(keyMap) {
        var cls = this;

        Object.keys(keyMap).map(function(key) {
            var query = cls.select(keyMap[key]);
            if(query.length)
                cls[key] = query[0].value;
        });
    };

    return XPathObject;
}

module.exports = AbstractXPathObject;