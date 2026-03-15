#!/usr/bin/env node

const os = require("os");
const downloader = require("./downloader");
const utilities = require("./utilities");
const unzip = require("./unzip");
const getCurrentOS = require("./getCurrentOS")

const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);

(async function () {
  const { currentOS, fileName, destination } = getCurrentOS();

  await utilities.safeMkdir(destination);

  console.log(`Downloading ${fileName} for ${currentOS}`);
  await downloader.downloadChromeV2(currentOS, fileName, args[0]);

  console.log(`\nUnzipping the files to ${destination}`);
  await unzip.unzipFile(fileName, destination);

  if (currentOS === "Mac_Arm") {
    console.log(`Don't forget to move Chromium.app to /Applications and `+
      "make it executable using these commands: \n\n"+
      "mv ~/Downloads/chrome-mac/Chromium.app /Applications/\n"+
      "chmod -R 755 /Applications/Chromium.app\n\n")
  }

  console.log("Done");
})().catch((e) => {
  console.error(e);
});
