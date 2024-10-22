const fs = require("fs");
const yd = require("ytdl-core");

const downloadFolder = "./";

const download = async (URL) => {
  // audio
  // const info = await yd.getBasicInfo(URL, { quality: "highestaudio", filter: "audioonly" });

  // video
  const info = await yd.getBasicInfo(URL, { quality: "highestaudio" });

  const title = info.player_response.videoDetails.title.replace(/  /g, " ").replace(/ /g, "-");
  yd(URL, { quality: "highestaudio", filter: "audioonly" })
    .pipe(fs.createWriteStream(`${downloadFolder}/${title}.mp3`));
};

const urls = fs.readFileSync("urls.txt", { encoding: "utf-8" }).split('\n');
const downloadPromise = urls.map(url => download(url));
Promise.all(downloadPromise);