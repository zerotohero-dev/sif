'use strict';

var fs = require('fs');
var byline = require('byline');
var request = require('request');
var LineStream = require('byline').LineStream;
var stream = byline(fs.createReadStream('sorted.txt', { encoding: 'utf8' }));
var writeStream1 = fs.createWriteStream('amended-titles.txt', {encoding: 'utf8'});
var writeStream2 = fs.createWriteStream('amended-links.txt', {encoding: 'utf8'});
var counter = 0;
stream.on('data', function(line) {
    request(line, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var replaced = body.replace(/\s+/g, ' ');
	    var result = /<title>(.*?)<\/title>/i.exec(replaced); 

            //console.log(result && result[1]);

            writeStream1.write(line + ' :: ' + (result ? result[1] : '-') + '\n');
            writeStream2.write((result ? result[1] : '-') + ' :: ' + line + '\n');

            //console.log(body) // Show the HTML for the Google homepage. 

           console.log(counter++);
        }
    });
});
