const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const extractFrames = require('ffmpeg-extract-frames');
const ffmpeg = require('fluent-ffmpeg');
const Jimp = require('jimp');

const { getVideoDurationInSeconds } = require('get-video-duration');
const numFrames = 5;
var images = [];

ffmpeg.setFfmpegPath(ffmpegPath);

async function getDuration(pathVideo){
     let durationVideo = 0;
     await getVideoDurationInSeconds(pathVideo).then((duration) => {
          console.log('Video duration: ' +duration);
          durationVideo = duration*1000;
     })
     return durationVideo;
}

function extractImages(pathVideo){
     return new Promise((resolve, reject) => {
          getDuration(pathVideo).then(async (res) => {
               await extractFrames({
                    input: pathVideo,
                    output: __dirname +'/res/IMAGEN-%i.png',
                    offsets: getRandomDuration(numFrames, res)
               })
               resolve('Images generated successfully');
          })
     })
     
}

function getRandomDuration(numframes, duration){
     let numRandoms = [];
     for(let i=0; i<numframes; i++){
          let numRandom = Math.round(Math.random()*(duration-1)+1);
          console.log('Random frame at millisecond ' +numRandom);
          numRandoms.push(numRandom);
     }
     return numRandoms;
}

extractImages('./res/test.mp4').then((res) =>{
     console.log(res);
     for(let i = 1; i <= numFrames; i++){
          let pathImage = './res/IMAGEN-'+i+'.png';
          images.push(pathImage);
          Jimp.read(pathImage, (err, myImage) => {
               if(err) throw err;
               myImage
               .resize(100, 75)
               .quality(60)
               .write(pathImage);
          });
     }
}).then((res)=>{
     for(let i = 0; i<images.length; i++){
          console.log(images[i]);
     }
}).catch(err => {
     console.log(err);
});