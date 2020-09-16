const fs = require('fs');
const diff = require('diff');
const {EventEmitter} = require('events');

var old_file = fs.readFileSync('./var/file.txt', {encoding:"utf8"});
var fileEvent = new EventEmitter();

fileEvent.on('changed file', function(data){
  console.log('The file was changed and fired an event. This data was received:\n' + data);
});

fs.watch('./var/file.txt', function(eventType, filename) {
  fs.promises.readFile(`./var/${filename}`, {encoding:"utf8"})
    .then(function(data) {
    // only flash this message if the file's content has changed
    var new_file = data;
    if (new_file !== old_file) {
      console.log(`The content of ${filename} has changed: it was a ${eventType} event.`)
      var file_changes = diff.diffLines(old_file,new_file);
      /*
      console.log(`Here are the changes (promise!):`);
      */
      var all_changes = file_changes.map((change, i) => {
        if (change.added) {
          return `Added: ${change.value}`;
        }
        if (change.removed) {
          return `Removed: ${change.value}`;
        }
      });
      fileEvent.emit('changed file', all_changes.join('\n'));
    }
    old_file = new_file
  });
  }
);
