var fs = require('fs')
    path = require('path'),
    mkdirp = require('mkdirp-promise'),
    util = require('util');

function JsonWriter(docRoot) {
    var out = path.resolve(docRoot);
    this.outPath = mkdirp(out);
}

JsonWriter.prototype.write = function write(data) {
    data.map(loc => {
        const { meta } = loc;
        const { apt_ident, icao_ident } = meta;

        [ apt_ident, icao_ident ]
            .filter(ident => !!ident)
            .map(ident => {
                this.writeIdent(ident, loc)
            })
    });
};

JsonWriter.prototype.writeIdent = function writeIdent(ident, location) {
    this.outPath.then(dir => {
        const file = path.join(dir, ident + '.json');
        fs.writeFile(file, this.format(location), () => {
            process.stdout.write(file + '\n');
        });
    });
};

JsonWriter.prototype.format = function format(object) {
    return JSON.stringify(object, null, '\t')
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
    return new Promise((resolve, reject) => {
        if(ident == null) reject();

        const dir = path.join(this.outPath, ident);
        mkdirp(dir).then(_ => {
            resolve(dir);
        })
    });
};

module.exports = JsonWriter;