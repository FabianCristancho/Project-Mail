var Jimp = require('jimp');

// colors = new Map();
var count = 0;

function getColorPixels(inputImage){
     var colors = new Map();
     Jimp.read(inputImage)
     .then(image => {
     image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
         var auxString = JSON.stringify(Jimp.intToRGBA(image.getPixelColor(x,y)));
          if(colors.has(auxString)){
               count = colors.get(auxString) + 1;
               colors.set(auxString, count);
          }else{
               colors.set(auxString, 1);
          }
     });
     for (var [key, value] of colors){
          console.log(JSON.stringify(key) +' = ' +value);
     }
     // getColorPixels();
     })
     .catch(err=>{
          console.log(err);
     });
     return colors;
}

getColorPixels('test.png');

function recorreMap(){
     let pixelsColors = getColorPixels('test.png');
     for (var [key, value] of pixelsColors){
          console.log(JSON.stringify(key) +' = ' +value);
     }
}

// recorreMap();




// function getColorPixels(){
//      for (var [key, value] of colors){
//           console.log(JSON.stringify(key) +' = ' +value);
//      }
// }