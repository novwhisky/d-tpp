var fs = require('fs')
    path = require('path'),
    mkdirp = require('mkdirp-promise'),
    util = require('util');

function JsonWriter(docRoot) {
    this.outPath = path.resolve(docRoot);
}

JsonWriter.prototype.write = function write(data) {
    data.map(loc => {
        const { meta } = loc;
        const { apt_ident, icao_ident } = meta;

        [ apt_ident, icao_ident ]
            .filter(ident => ident != null)
            .map(ident => {
                this.scaffold(ident)
                    .then(dir => {
                        this.writeIdent(dir, loc)
                    })
            })
    });
};

JsonWriter.prototype.writeIdent = function writeIdent(dir, location) {
    fs.writeFile(path.join(dir, 'all.json'), this.format(location));

    const chartTypes = location.records.reduce((acc, val) => {
        const type = val.chart_code;
        return (acc.includes(type)) ? acc: acc.concat(type);
    }, []);
};

JsonWriter.prototype.format = function format(object) {
    return JSON.stringify(object, '\t', 1)
};

JsonWriter.prototype.getPubsByType = function getPubsByType(type, data) {
    const unfiltered = data.city_name.airport_name.record;
    const records = unfiltered
        .filter(record => record.chart_code === type)
        .map(record => {
            return {
                chartseq: record.chartseq,
                chart_name: record.chart_name,
                pdf_name: record.pdf_name
            }
        });

    return records;
};

JsonWriter.prototype.scaffold = function scaffold(ident) {
    if(ident != null) {
        const dir = path.join(this.outPath, ident);
        return mkdirp(dir).then(_ => dir);
    }
};

module.exports = JsonWriter;