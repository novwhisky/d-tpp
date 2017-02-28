const AbstractXPathObject = require('./abstract-xpath-object');

function digital_tpp(dom) {
    let cls = new AbstractXPathObject(dom);

    cls.setCustomKeys({
        cycle: '@cycle',
        from_edate: '@from_edate',
        to_edate: '@to_edate'
    });

    return cls;
}

module.exports = digital_tpp;