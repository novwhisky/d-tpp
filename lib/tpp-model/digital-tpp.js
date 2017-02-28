const AbstractXPathObject = require('./abstract-xpath-object');

function digital_tpp(dom) {
    let cls = new AbstractXPathObject(dom);

    const merges = {
        cycle: '@cycle',
        from_edate: '@from_edate',
        to_edate: '@to_edate'
    };

    Object.keys(merges).map(function(key) {
        var query = cls.select(merges[key]);
        if(query.length)
            cls[key] = query[0].value;
    });

    return cls;
}

module.exports = digital_tpp;