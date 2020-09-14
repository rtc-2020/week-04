const fs = require('fs');

fs.watch('./var/file.txt', function(eventType, filename) {
  fs.readFile(`./var/${filename}`, {encoding:"utf8"}, function(err, data) {
    console.log(`The file has this content:\n\n ${data}`);
    console.log(data);
  });

    console.log(`${filename} has changed: it was a ${eventType} event.`)
  }
);
