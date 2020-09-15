var Jimp = require('jimp');

Jimp.read('https://i.stack.imgur.com/jZhAM.png')
.then(image => {
     image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
         var aux = Jimp.intToRGBA(image.getPixelColor(x,y));
         console.log('(' +x +',' +y +'): ' +'(' +aux.r +',' +aux.g +',' +aux.b +')');
        });
})
.catch(err=>{
     console.log(err);
});

console.log('example');