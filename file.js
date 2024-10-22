const fs = require("fs");
const yd = require("ytdl-core");


const download = async (URL) => {

  const type = process.argv[3];
  const downloadFolder = `./${type ? type: 'videos'}`;
  let contentFormat;
  if (type === 'audios')
    // audio
  contentFormat = { quality: "highestaudio", filter: "audioonly" };
  else
    // video
    contentFormat = { quality: "highestaudio" };
  const info = await yd.getBasicInfo(URL, contentFormat);
  const title = `${info.player_response.videoDetails.title.replace(/  /g, " ").replace(/ /g, "-")}/${(type === 'audios')? '.mp3' : '.mp4'}`;
  yd(URL, contentFormat)
    .pipe(fs.createWriteStream(`${downloadFolder}/${title}`));
};
const urls = fs.readFileSync("urls.txt", { encoding: "utf-8" }).split('\n');
const downloadPromise = urls.map(url => url && download(url));
Promise.all(downloadPromise);
