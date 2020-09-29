const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const extractFrames = require('ffmpeg-extract-frames');
const ffmpeg = require('fluent-ffmpeg');
const Jimp = require('jimp');

const { getVideoDurationInSeconds } = require('get-video-duration');
const numFrames = 5;
var images = [];

ffmpeg.setFfmpegPath(ffmpegPath);

async function getDuration(){
     let durationVideo = 0;
     await getVideoDurationInSeconds('test.mp4').then((duration) => {
          console.log(duration);
          durationVideo = duration*1000;
     })
     return durationVideo;
}

function extractImages(){
     return new Promise((resolve, reject) => {
          getDuration().then(async (res) => {
               await extractFrames({
                    input: 'test.mp4',
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
          //Num random entre 1 y duration
          let numRandom = Math.round(Math.random()*(duration-1)+1);
          numRandoms.push(numRandom);
     }
     return numRandoms;
}

// console.log(getRandomDuration(5, 6000));


//ESTAN FUNCIONANDO

// console.log('Duration is: ' +getDuration().then((res)=>{
//      console.log('otro: ' +res);
// }));


extractImages().then((res) =>{
     console.log(res);
     for(let i = 1; i <= numFrames; i++){
          let pathImage = __dirname+'/res/IMAGEN-'+i+'.png';
          Jimp.read(pathImage, (err, myImage) => {
               if(err) throw err;
               myImage
               .resize(100, 75)
               .quality(60)
               .write(pathImage);
          });
     }
}).catch(err => {
     console.log(err);
});


