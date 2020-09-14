const fs = require('fs');
var old_file = fs.readFileSync('./var/file.txt', {encoding:"utf8"});

fs.watch('./var/file.txt', function(eventType, filename) {
  fs.readFile(`./var/${filename}`, {encoding:"utf8"}, function(err, data) {
    // only flash this message if the file's content has changed
    var new_file = data;
    if (new_file !== old_file) {
      console.log(`The content of ${filename} has changed: it was a ${eventType} event.`)
    }
    old_file = new_file
  });
  }
);
