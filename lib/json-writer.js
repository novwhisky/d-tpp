var fs = require('fs')
    path = require('path'),
    mkdirp = require('mkdirp-promise'),
    util = require('util');

function JsonWriter(docRoot) {
    this.outPath = path.resolve(docRoot);
}

JsonWriter.prototype.write = function write(data) {
    this.scaffold(data, err => {
        if(err) throw err;

        const { apt_ident, icao_ident } = data.city_name.airport_name['$'];

        [ apt_ident, icao_ident ]
            .filter(ident => ident != null)
            .map(ident => {
                this.writeIdent(ident, data);
            })
    });
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

JsonWriter.prototype.writeIdent = function writeIdent(ident, data) {
    const dir = path.join(this.outPath, ident);

    const meta = {
        state_code: data.$.ID,
        state_fullname: data.$.state_fullname,
        city_name: data.city_name.$.ID,
        airport_name: data.city_name.airport_name.$.ID,
        military: data.city_name.airport_name.$.military,
        apt_ident: data.city_name.airport_name.$.apt_ident,
        icao_ident: data.city_name.airport_name.$.icao_ident,
        alnum: data.city_name.airport_name.$.alnum
    };


    const chartTypes = [ 'APD', 'DP', 'HOT', 'IAP', 'LAH', 'MIN' ];
    const allCharts = chartTypes
        .map(type => this.getPubsByType(type, data))
        .reduce((acc, val) => acc.concat(val));

        //console.log(allCharts);

    const all = { meta, charts: allCharts };

    const APD = { meta, charts: this.getPubsByType('APD', data) };
    const MIN = { meta, charts: this.getPubsByType('MIN', data) };

    //console.log(data.city_name.airport_name);

    fs.writeFileSync(path.join(dir, 'all.json'), JSON.stringify(all, '\t', 1));

};

JsonWriter.prototype.scaffold = function scaffold(loc, cb) {
    const { apt_ident, icao_ident } = loc.city_name.airport_name['$'];

    cb = cb || (_ => _);

    const targets = [ apt_ident, icao_ident ]
        .filter(ident => ident != null);

    Promise.all(
        targets.map(ident => {
            const dir = path.join(this.outPath, ident);
            return mkdirp(dir)
        })
    ).then(() => cb(), cb)

    };

module.exports = JsonWriter;