const downloader = require("../src/downloader");
let mediaLinkUrl;
let lastChangeContents;

describe("Test the downloader code block for Windows x64", () => {
   it("media link should not be empty", async () => {
      let httpCall = await downloader._GET("/storage/v1/b/" +
         `chromium-browser-snapshots/o/Win_x64%2FLAST_CHANGE`);
      let parsedResult = JSON.parse(httpCall);
      mediaLinkUrl = parsedResult.mediaLink;
      expect(mediaLinkUrl).toBeTruthy();
   });
   it("should return the LAST_CHANGE number", async () => {
      let contents = await downloader._GET(mediaLinkUrl);
      expect(isNaN(contents)).toBe(false);
      lastChangeContents = contents;
   });
   it("should be a file named 'chrome-win.zip'", async () => {
      // Win_x64/638527/chrome-win.zip
      let httpCall = await downloader._GET("/storage/v1/b/chromium-" +
         `browser-snapshots/o?delimiter=/&prefix=Win_x64/${lastChangeContents.trim()}` +
         "/&fields=items(kind,mediaLink,metadata,name,size," +
         "updated),kind,prefixes,nextPageToken");
      // httpCall.items => name should be chrome-win.zip
      let {items} = JSON.parse(httpCall);
      let searchItem = items.filter(e => e.name === "Win_x64/"
         + lastChangeContents + "/chrome-win.zip");
      expect(searchItem.length).toBe(1);
   });
});
