var Jimp = require('jimp');

function getColorPixels(inputImage) {
	return new Promise((resolve, reject) => {
          var colors = new Map();
          var count = 0;
		Jimp.read(inputImage)
			.then((image) => {
				image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
					var auxString = JSON.stringify(Jimp.intToRGBA(image.getPixelColor(x, y)));
					if (colors.has(auxString)) {
						count = colors.get(auxString) + 1;
						colors.set(auxString, count);
					} else {
						colors.set(auxString, 1);
					}
				});
                    resolve(colors);
			})
			.catch((err) => {
				console.log(err);
			});
	});
}

function recorreMap(image) {
     getColorPixels(image).then((res)=>{
          pixelsColors = res;
          for (var [ key, value ] of pixelsColors) {
               console.log(key + ' : ' + value);
          }
     }).catch(err =>{
          console.log(err);
     })
}


recorreMap('test.png');
recorreMap('https://icons.iconarchive.com/icons/graphicloads/android-settings/16/plus-icon.png');
