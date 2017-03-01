var fs = require('fs')
    path = require('path');

function JsonWriter(docRoot) {
    this.outPath = path.resolve(docRoot);
    //this.ws = fs.open(this.outPath, 'w+', (err, fd) => {
    //    this.fd = fd;
    //   console.log(fd);
    //});
}

//JsonWriter.prototype.allCbs = function allCbs(cb) {
//
//};

JsonWriter.prototype.write = function write(data) {
    //console.log(data.city_name.airport_name['$']);
    this.scaffold(data);
};

JsonWriter.prototype.scaffold = function scaffold(loc, cb) {
    const { apt_ident, icao_ident } = loc.city_name.airport_name['$'];

    cb = cb || (_ => _);

    fs.mkdir(this.outPath, err => {
        if(err)
            cb(err);

        //
        //subtargets.map((ident, idx, arr) => {
        //
        //});
        //fs.mkdir(path.join(this.outPath, icao_ident), err => {
        //
        //});

        const subtargets = [ apt_ident, icao_ident ].filter(ident => ident != null);

        var p = Promise.all(
            subtargets.map(ident => {
                return new Promise((resolve, reject) => {
                    const dir = path.join(this.outPath, ident);
                    fs.mkdir(dir, err => {
                        if(err) reject(err);
                        else resolve(dir);
                    })
                });
            })
        ).then(cb)
    });
};

module.exports = JsonWriter;