const fs = require("fs");
const yd = require("ytdl-core");

const URL = "https://youtu.be/NW7-O2fnl1Y?si=RDca1XZ_Wjt3kOTC";
const downloadFolder = "/home/ranjeet_barsa/Downloads";
(async () => {
  // const info = await yd.getBasicInfo(URL, { quality: "highestaudio", filter: "audioonly" });
  const info = await yd.getBasicInfo(URL);
  // const title = info.player_response.videoDetails.title.replace(/  /g, " ").replace(/ /g, "-");
  const title = 'audio';
  yd(URL, { quality: "highest", filter: "audioonly" })
    .pipe(fs.createWriteStream(`${downloadFolder}/${title}.mp3`));
})();


// const URL = "https://youtu.be/mmc-QPQ74qc?feature=shared";
// const downloadFolder = "/home/ranjeet_barsa/Downloads";
// (async () => {
//   // const info = await yd.getBasicInfo(URL, { quality: "highestaudio", filter: "audioonly" });
//   const info = await yd.getBasicInfo(URL);
//   // const title = info.player_response.videoDetails.title.replace(/  /g, " ").replace(/ /g, "-");
//   const title = 'audio';
//   // yd(URL, { quality: "highest", filter: "audioonly" })
//   //   .pipe(fs.createWriteStream(`${downloadFolder}/${title}.mp3`));

//   console.log(JSON.stringify(info));
// })();
