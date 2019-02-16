const https = require("https");
const fs = require("fs");

function _GET(path, download = false, fileName = "") {
    return new Promise((resProm, rejProm) => {
        let chunk = "";
        // progress bar vars
        let total = 0;
        let received = 0;
        // request stuff
        const options = {
            hostname: "www.googleapis.com",
            port: 443,
            path: path,
            method: "GET"
        };
        let req = https.request(options, (res) => {
            if (download === true) {
                res.pipe(fs.createWriteStream(fileName));
                res.on("end", () => {
                    resProm(true);
                });
                // while getting data calculate and print out the percentage
                res.on("data", (chunk) => {
                    received += chunk.length;
                    // print out the percentage
                    process.stdout.write("\r" +
                        Math.floor(received * 100 / total) + "%"
                    );
                });
                res.on("error", (e) => rejProm(e));
            } else {
                res.setEncoding("utf8");
                res.on("data", (data) => {
                    // fill the chunk with data
                    chunk += data;
                });
                res.on("end", () => resProm(chunk.toString()));
                res.on("error", (e) => rejProm(e));
            }
        });
        // get the total size for the progress bar
        if (download === true) {
            req.on("response", (data) => {
                total = data.headers["content-length"];
            });
        }
        req.on("error", (e) => {
            rejProm(e);
        });
        req.end();
    });
}

async function downloadChromeV2(os, fileName) {
    return new Promise(async (resProm, rejProm) => {
        try {
            let httpCall = await _GET("/storage/v1/b/" +
                `chromium-browser-snapshots/o/${os}%2FLAST_CHANGE`);
            let last_change = JSON.parse(httpCall);

            if (typeof last_change.mediaLink === "undefined") {
                rejProm("Cannot find LAST_CHANGE file");
            } else {
                let lastChangeContents = await _GET(last_change.mediaLink);
                // "change" directory to the newest snapshot using LAST_CHANGE's value
                let httpCall = await _GET("/storage/v1/b/chromium-" +
                    `browser-snapshots/o?delimiter=/&prefix=${os}/${lastChangeContents.trim()}` +
                    "/&fields=items(kind,mediaLink,metadata,name,size," +
                    "updated),kind,prefixes,nextPageToken");
                let reqFolder = JSON.parse(httpCall);
                // check if there's a valid file to download
                let elementToDownload = reqFolder.items.filter(e => e.name.endsWith(fileName));
                if (elementToDownload.length !== 0) {
                    await _GET(elementToDownload[0].mediaLink, true, fileName);
                } else {
                    rejProm("404 Find not found");
                }

                resProm("done");
            }
        } catch (e) {
            rejProm(e);
        }
    });
}


module.exports.downloadChromeV2 = downloadChromeV2;
