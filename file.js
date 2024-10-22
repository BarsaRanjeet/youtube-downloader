const fs = require("fs");
const yd = require("ytdl-core");


const download = async (URL) => {

  const type = process.argv[3];
  const downloadFolder = `./${type ? type: 'videos'}`;
  let info;
  if (type === 'audios')
    // audio
    info = await yd.getBasicInfo(URL, { quality: "highestaudio", filter: "audioonly" });
  else
    // video
    info = await yd.getBasicInfo(URL, { quality: "highestaudio" });

  const title = info.player_response.videoDetails.title.replace(/  /g, " ").replace(/ /g, "-");
  yd(URL, { quality: "highestaudio", filter: "audioonly" })
    .pipe(fs.createWriteStream(`${downloadFolder}/${title}.mp3`));
};

const urls = fs.readFileSync("urls.txt", { encoding: "utf-8" }).split('\n');
const downloadPromise = urls.map(url => download(url));
Promise.all(downloadPromise);
