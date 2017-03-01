const fs = require('fs'),
    path = require('path'),
    XmlStream = require('xml-stream'),
    Writer = require('./lib/json-writer');



//const stream = fs.createReadStream('./srcdata/d-TPP_Metafile.xml');
const stream = fs.createReadStream('./srcdata/dtpp-sample.xml');

const xml = new XmlStream(stream);
const writer = new Writer('./outdata');


function flatten(data) {
    const stateObj = data.$;

    const locations = data.city_name.map((city, i) => {
        const cityObj = city.$;
        const airports = city.airport_name.map(airport => {
            const airportObj = airport.$;
            const records = airport.record.map(record => {
                return {
                    chartseq: record.chartseq,
                    chart_code: record.chart_code,
                    chart_name: record.chart_name,
                    pdf_name: record.pdf_name
                }
            });

            //console.log(++i + ')', airportObj.apt_ident);

            return {
                records,
                meta: {
                    state_code: stateObj.ID,
                    state_fullname: stateObj.state_fullname,
                    city_name: cityObj.ID,
                    airport_name: airportObj.ID,
                    military: airportObj.military,
                    apt_ident: airportObj.apt_ident,
                    icao_ident: airportObj.icao_ident,
                    alnum: airportObj.alnum
                }
            }
        });

        return airports.reduce((acc, val) => [].concat(acc, val));
    });

    return locations;
}


xml.collect('city_name');
xml.collect('airport_name');
xml.collect('record');
xml.on('endElement: state_code', data => {
    //console.log(data);
    //writer.write(data);
    var d = flatten(data);
    writer.write(d);
});

