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

  if (currentOS === "Mac_Arm") {
    console.log(`\nMoving the file to ${destination}`);
    await fs.promises.rename(fileName, path.join(destination, fileName));

    console.log("Because of macOS security restrictions, you have to "+
      "manually unzip the file and move Chromium.app to Applications folder");

    return
  }

  console.log(`\nUnzipping the files to ${destination}`);
  await unzip.unzipFile(fileName, destination);

  console.log("Done");
})().catch((e) => {
  console.error(e);
});
