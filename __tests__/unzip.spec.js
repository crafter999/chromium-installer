const unzip = require("../src/unzip");
const fs = require("fs");

describe("Test the yauzl library",()=>{
   it("should unzip the file and return the contents", async () => {
      await unzip.unzipFile("__tests__/tmp/test.zip",".");
      let fileContents = fs.readFileSync("test.txt").toString();
      fs.unlinkSync("test.txt");
      expect(fileContents).toBe("hello world");
   });
});
