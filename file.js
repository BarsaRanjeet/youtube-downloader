const fs = require("fs");
const yd = require("@distube/ytdl-core");


const download = async (URL) => {

  const type = process.argv[3];
  const downloadFolder = `./${type ? type : 'videos'}`;
  const info = await yd.getBasicInfo(URL);
  const title = `${info.player_response.videoDetails.title.replace(/  /g, " ").replace(/ /g, "-")}${(type === 'audios') ? '.mp3' : '.mp4'}`;
  if (type === 'audios') {
    // audio
    yd(URL, { quality: "highestaudio", filter: "audioonly" })
      .pipe(fs.createWriteStream(`${downloadFolder}/${title}`));
  }
  else {
    // video
    yd(URL)
      .pipe(fs.createWriteStream(`${downloadFolder}/${title}`));
  }

};
const urls = fs.readFileSync("urls.txt", { encoding: "utf-8" }).split('\n');
const downloadPromise = urls.map(url => url && download(url));
Promise.all(downloadPromise);
