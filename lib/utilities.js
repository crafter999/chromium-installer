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
            await this.rmdirRecu(destination);
            // make a new folder in place
            fs.mkdirSync(destination);
            resProm("OK");
         } catch (e) {
            if (e.code === "EPERM")
               rejProm("You don't have write permissions in this folder");
            else if (e.code === "ENOENT") {
               // if folder doesn't exists skip deletion and create a new folder
               fs.mkdirSync(destination);
               resProm("OK");
            } else {
               rejProm(e);
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
               }
               else {
                  resProm(false);
               }
            }
         });
      });
   }

   static rmdirRecu(dir) {
      const list = fs.readdirSync(dir);
      for (let i = 0; i < list.length; i++) {
         const filename = path.join(dir, list[i]);
         const stat = fs.statSync(filename);

         if (filename === "." || filename === "..") {
            // pass these files
         } else if (stat.isDirectory()) {
            // rmdir recursively
            this.rmdirRecu(filename);
         } else {
            // rm fiilename
            fs.unlinkSync(filename);
         }
      }
      fs.rmdirSync(dir);
   }
}

module.exports = utilities;
