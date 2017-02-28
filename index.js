var path = require('path'),
    Xml = require('./lib/xml');

var dbFile = path.join('.', 'srcdata', 'd-TPP-Metafile_1702.xml');
var xmlDb = new Xml({src: dbFile});


var query = '/digital_tpp/state_code/city_name/airport_name/@apt_ident';

var nodes = xmlDb.select(query);

var idents = nodes.map(function(node) {
    return node.value;
});
console.log(idents);