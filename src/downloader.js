const https = require("https");
const fs = require("fs");

const get = (path, download = false, fileName = "") =>
  new Promise((resolve, reject) => {
    let chunk = "";
    let total = 0;
    let received = 0;

    const options = {
      hostname: "www.googleapis.com",
      port: 443,
      path: path,
      method: "GET",
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Request failed with status code ${res.statusCode}`));
        return;
      }

      if (download) {
        res.pipe(fs.createWriteStream(fileName));
        res.on("data", (chunk) => {
          if (total === 0) total = parseInt(res.headers["content-length"], 10);
          received += chunk.length;
          process.stdout.write(`\r${Math.floor((received * 100) / total)}%`);
        });
        res.on("end", () => resolve(true));
        res.on("error", reject);
      } else {
        res.setEncoding("utf8");
        res.on("data", (data) => {
          chunk += data;
        });
        res.on("end", () => resolve(chunk));
        res.on("error", reject);
      }
    });

    req.on("error", reject);
    req.end();
  });

const downloadChromeV2 = async (os, fileName) => {
    const lastChangeResponse = await get(
        `/storage/v1/b/chromium-browser-snapshots/o/${os}%2FLAST_CHANGE`
    );
    const lastChangeData = JSON.parse(lastChangeResponse);

    if (!lastChangeData.mediaLink) {
        throw new Error("Cannot find LAST_CHANGE file");
    }

    const lastChangeContents = await get(lastChangeData.mediaLink);
    const latestSnapshotPath = `${os}/${lastChangeContents.trim()}`;

    const snapshotResponse = await get(
        `/storage/v1/b/chromium-browser-snapshots/o?delimiter=/&prefix=${latestSnapshotPath}` +
        "/&fields=items(kind,mediaLink,metadata,name,size,updated),kind,prefixes,nextPageToken"
    );
    const snapshotData = JSON.parse(snapshotResponse);

    const fileToDownload = snapshotData.items.find((item) => item.name.endsWith(fileName));

    if (!fileToDownload) {
        throw new Error("File not found");
    }

    await get(fileToDownload.mediaLink, true, fileName);
    return "Download completed";
};

module.exports = { downloadChromeV2, get };