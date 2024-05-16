const fs = require("fs");
const os = require("os");
const path = require("path");

module.exports = function getCurrentOS(){
    if (
      fs.existsSync("/system/bin/getprop") ||
      fs.existsSync("/system/build.prop")
    ) {
      return {
        currentOS: "Android",
        fileName: "chrome-android.zip",
        destination: "/data/local/tmp/chromium-installer/",
      };
    } else if (os.type() === "Linux") {
      return {
        currentOS: "Linux_x64",
        fileName: "chrome-linux.zip",
        destination: "/opt/chromium/",
      };
    } else if (os.type() === "Windows_NT") {
      return {
        currentOS: "Win_x64",
        fileName: "chrome-win.zip",
        destination: "C:\\Program Files\\Chromium",
      };
    } else if (os.type() === "Darwin") {
      const downloadsFolder = path.join(os.homedir(), "Downloads");
      return {
        currentOS: "Mac_Arm",
        fileName: `chrome-mac.zip`,
        destination:downloadsFolder,
      };
    } else {
      throw new Error("Your OS is not supported yet");
    }
}

