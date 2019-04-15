const util = require("../src/utilities");
const fs = require("fs");

describe("testing the utilities", ()=>{
   it("should make some folders and files", async () => {
      await util.safeMkdir("__tests__/tmp/folder1");
      await util.safeMkdir("__tests__/tmp/folder1/folder1a");
      await util.safeMkdir("__tests__/tmp/folder1/folder1b");
      fs.writeFileSync("__tests__/tmp/folder1/folder1a/test1","hi");
      fs.writeFileSync("__tests__/tmp/folder1/folder1b/test2","hi");
   });
   it("should delete contents recursively", async () => {
      util.rmdirRecuSync("__tests__/tmp/folder1");
      const folderExists = fs.existsSync("__tests__/tmp/folder1");
      expect(folderExists).toBe(false);
   });
});
