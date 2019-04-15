const fs = require("fs");
const path = require("path");

class utilities {
   // WARNING! If folder exists it will be deleted
   static safeMkdir(destination) {
      return new Promise(async (resProm, rejProm) => {
         try {
            // check if folder exits
            fs.accessSync(destination, fs.constants.F_OK);
            // delete old stuff if existed
            this.rmdirRecuSync(destination);
            // make a new folder in place
            fs.mkdirSync(destination);
            resProm("OK");
         } catch (e) {
            // if folder doesn't exists check permission and create a new folder
            if (e.code === "ENOENT") {
               fs.mkdir(destination, (error) => {
                  if (error) {
                     if (error.code === "EPERM") {
                        rejProm(new Error("You don't have write permissions in this folder: " + destination));
                     } else {
                        rejProm(e); // generic error
                     }
                  }
                  resProm("OK");
               });
            } else {
               rejProm(e); // generic error
            }
         }
      });
   }

   static isDirEmpty(path) {
      return new Promise((resProm, rejProm) => {
         fs.readdir(path, (error, files) => {
            if (error) rejProm(error);
            else {
               if (!files.length) {
                  // Directory is empty
                  resProm(true);
               } else {
                  resProm(false);
               }
            }
         });
      });
   }

   static rmdirRecuSync(dir) {
      const list = fs.readdirSync(dir);
      for (let i = 0; i < list.length; i++) {
         const filename = path.join(dir, list[i]);
         const stat = fs.statSync(filename);

         if (filename === "." || filename === "..") {
            // pass these files
         } else if (stat.isDirectory()) {
            // rmdir recursively
            this.rmdirRecuSync(filename);
         } else {
            // rm filename
            fs.unlinkSync(filename);
         }
      }
      fs.rmdirSync(dir);
   }
}

module.exports = utilities;
