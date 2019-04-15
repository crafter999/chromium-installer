#!/usr/bin/env node

const os = require("os");
const downloader = require("./src/downloader");
const utilities = require("./src/utilities");
const unzip = require("./src/unzip");
const fs = require("fs");
const args = process.argv.slice(2);

(async function () {
   let currentOS;
   let fileName;
   let destination;

   if (os.type() === "Linux") {
      currentOS = "Linux_x64";
      fileName = "chrome-linux.zip";
      destination = "/opt/chromium/";
   } else if (os.type() === "Windows_NT") {
      currentOS = "Win_x64";
      fileName = "chrome-win.zip"; // the old one was "chrome-win32.zip"
      destination = "C:\\Program Files\\Chromium";
   } else {
      throw new Error("Your OS is not supported yet");
   }

   try {
      await utilities.safeMkdir(destination);

      console.log(`Downloading ${fileName} for ${currentOS}`);
      await downloader.downloadChromeV2(currentOS, fileName, args[0]);

      console.log("\nUnzipping the files to " + destination);
      await unzip.unzipFile(fileName, destination);

      // delete zip file
      fs.unlinkSync(fileName);

      console.log("Done");
   } catch (e) {
      console.error(e);
      process.exit(1);
   }
})();
