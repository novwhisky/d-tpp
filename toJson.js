const fs = require('fs'),
    path = require('path'),
    XmlStream = require('xml-stream'),
    Writer = require('./lib/json-writer');



//const stream = fs.createReadStream('./srcdata/d-TPP_Metafile.xml');
const stream = fs.createReadStream('./srcdata/dtpp-sample.xml');

const xml = new XmlStream(stream);
const writer = new Writer('./web');


function flatten(tpp) {
    let airports = [];

    const tppObj = tpp.$;

    tpp.state_code.map(state => {
        const stateObj = state.$;

        state.city_name.map(city => {
            const cityObj = city.$;

            airports = airports.concat(
                city.airport_name.map(airport => {
                    const airportObj = airport.$;
                    const records = airport.record.map(record => {
                        return {
                            chartseq: record.chartseq,
                            chart_code: record.chart_code,
                            chart_name: record.chart_name,
                            pdf_name: record.pdf_name
                        }
                    });

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
                            alnum: airportObj.alnum,
                            cycle: tppObj.cycle,
                            from_edate: tppObj.from_edate,
                            to_edate: tppObj.to_edate
                        }
                    }
                })
            );
        });
    });

    return airports;
}

xml.collect('state_code');
xml.collect('city_name');
xml.collect('airport_name');
xml.collect('record');
xml.on('endElement: digital_tpp', data => {
    var d = flatten(data);
    writer.write(d);
});

