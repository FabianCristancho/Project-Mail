var Jimp = require('jimp');
const pdf = require('./pdf');
const extractImage = require('./extractImage');
const numFrames = 5;

var reportImages = [];

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

function recorreMap(image, title, point) {
	return new Promise((resolve, reject) => {
		let pixelsColors = null;
		getColorPixels(image).then((res)=>{
			pixelsColors = res;
			for (var [ key, value ] of pixelsColors) {
				console.log(key + ' : ' + value);
			}
			resolve(pixelsColors);
		}).catch(err =>{
			console.log(err);
		})
	})
}

function changeSize(){
		console.log('Entra al for');
		for(let i = 1; i <= numFrames; i++){
			let pathImage = './res/IMAGEN-'+i+'.png';
			reportImages.push({path: pathImage, title: 'IMAGEN ' +i, position: 130})
			// images.push(pathImage);
			console.log('EMPIEZA');
			Jimp.read(pathImage)
			.then(myImage => {
				return myImage
				.resize(100, 75)
				.quality(60)
				.write(pathImage);
			})
			.catch(err => {
				console.error(err);
			});
		}
}



async function addImages(){
		console.log('Start');
		let report = [];

		for(let i = 0; i<reportImages.length; i++){
			let path = reportImages[i].path;
			let title = reportImages[i].title;
			let position = reportImages[i].position;
			await recorreMap(path, title, position).then((res)=>{
				// console.log(res);
				report.push({title: title, arrayColors: res, position: position, path: path})
				console.log('ES:' +report.length);
			}).catch(err => {
				console.log(err);
			});
		}
		console.log('sdsd: ' +report.length);
		console.log('hola: ' +report[1].title);
		pdf.multipleTables(report);
		return report;
		
}

extractImage.extractImages('./res/test.mp4').then((res) =>{
	console.log(res);
	changeSize();
	setTimeout(function(){ addImages(); }, 3000);
})
.catch(err => {
     console.log(err);
});