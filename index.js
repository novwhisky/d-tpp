var fs = require('fs'),
    path = require('path'),
    Xml = require('./lib/xml'),
    digital_tpp = require('./lib/tpp-model/digital-tpp');

var dbFile = path.join('.', 'srcdata', 'd-TPP_Metafile.xml');
var xmlDoc = fs.readFileSync(dbFile, 'utf8');
var dtpp = new digital_tpp(xmlDoc);

//console.log(dtpp);
/*
var xmlDb = new Xml({src: dbFile});


var query = '/digital_tpp/state_code/city_name/airport_name/@apt_ident';

var nodes = xmlDb.select(query);

var idents = nodes.map(function(node) {
    return node.value;
});
console.log(idents);
*/