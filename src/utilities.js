const fs = require("fs");
const path = require("path");

class Utilities {
  static async safeMkdir(destination) {
    try {
      await fs.promises.mkdir(destination, { recursive: true });
    } catch (err) {
      if (err.code === "EEXIST") {
        await this.rmdirRecursive(destination);
        await fs.promises.mkdir(destination);
      } else if (err.code === "EACCES") {
        throw new Error(
          `You don't have write permissions in this folder: ${destination}`
        );
      } else {
        throw err;
      }
    }
  }

  static async isDirEmpty(path) {
    const files = await fs.promises.readdir(path);
    return files.length === 0;
  }

  static async rmdirRecursive(dir) {
    const files = await fs.promises.readdir(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.promises.stat(filePath);
      if (stat.isDirectory()) {
        await this.rmdirRecursive(filePath);
      } else {
        await fs.promises.unlink(filePath);
      }
    }
    await fs.promises.rmdir(dir);
  }

  static async checkExecutable(file) {
    try {
      await fs.promises.access(file, fs.constants.X_OK);
      return true;
    } catch (err) {
      if (err.code === "EACCES") {
        return false;
      }
      throw err;
    }
  }
}

module.exports = Utilities;
