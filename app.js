const fs = require('fs');
const diff = require('diff');

var old_file = fs.readFileSync('./var/file.txt', {encoding:"utf8"});

fs.watch('./var/file.txt', function(eventType, filename) {
  fs.readFile(`./var/${filename}`, {encoding:"utf8"}, function(err, data) {
    // only flash this message if the file's content has changed
    var new_file = data;
    if (new_file !== old_file) {
      console.log(`The content of ${filename} has changed: it was a ${eventType} event.`)
      var file_changes = diff.diffLines(old_file,new_file);
      console.log(`Here are the changes:`);
      file_changes.forEach((change, i) => {
        if (change.added) {
          console.log(`Added: ${change.value}`);
        }
        if (change.removed) {
          console.log(`Removed: ${change.value}`);
        }
      });

    }
    old_file = new_file
  });
  }
);
