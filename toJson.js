const fs = require('fs'),
    path = require('path'),
    XmlStream = require('xml-stream'),
    Writer = require('./lib/json-writer');


//fs.readFile('./srcdata/d-TPP_Metafile.xml', (err, data) => {
//    console.log('!' + data);
//});

//const xmlStream = fs.createReadStream('./srcdata/d-TPP_Metafile.xml', { defaultEncoding: 'utf8' })
//    xmlStream.on('data', data => {
//       console.log('!!! ' + data);
//    });

//xml.on('startElement: airport_name', data => {
//    console.log(data);
//});

//xml.on('endElement: airport_name', data => {
//    console.log(data);
//});

//const stream = fs.createReadStream('./srcdata/d-TPP_Metafile.xml');
const stream = fs.createReadStream('./srcdata/dtpp-sample.xml');
const xml = new XmlStream(stream);
const writer = new Writer('./outdata');

xml.collect('record');
xml.on('endElement: state_code', data => {
    writer.write(data);
});