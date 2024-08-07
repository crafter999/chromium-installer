const fs = require("fs");
const yauzl = require("yauzl");
const path = require("path");
const mkdirp = require("mkdirp");

function unzipFile(fileName, destination) {
   return new Promise(function (resProm, rejProm) {
      if (!fs.existsSync(fileName)) {
         rejProm("Error while unzipping: File does not exists");
      }

      yauzl.open(fileName, {autoClose: true, lazyEntries: true}, (error, zipfile) => {
         if (error) {
            rejProm("Error while extracting zip file");
            process.exit();
         }
         // console.info("Unzipping the file");
         zipfile.readEntry();
         zipfile.on("entry",  (entry) => {
            const fileName = path.join(destination, entry.fileName);
            if (/\/$/.test(entry.fileName)) {
               // directory file names end with '/'
               mkdirp.sync(fileName);
               zipfile.readEntry();
            } else {
               // file entry
               zipfile.openReadStream(entry, (fileError, readStream) => {
                  // ensure parent directory exists
                  mkdirp.sync(path.dirname(fileName));
                  readStream.pipe(fs.createWriteStream(fileName));
                  readStream.on("end", () => {
                     zipfile.readEntry();
                  });
               });
            }
         });
         zipfile.once("end", () => {
            resProm("ended");
         });
      });
   });
}

module.exports.unzipFile = unzipFile;
