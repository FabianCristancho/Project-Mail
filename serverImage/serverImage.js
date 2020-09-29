var Jimp = require('jimp');
const pdf = require('./pdf');
var reportImages = [{path: 'test.png', title: 'FIGURA 1', position: 130},
				{path: 'https://icons.iconarchive.com/icons/graphicloads/android-settings/16/plus-icon.png', title: 'FIGURA 2', position: 130}
				];

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
			// pdf.drawBlockTable(title, pixelsColors, point);
		}).catch(err =>{
			console.log(err);
		})
	})
}

async function addImages(){
	// return new Promise((resolve, reject) => {
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
		// resolve(report);
	// })
}

addImages();

// addImages().then((res)=>{
// 	let aux = res;
// 	console.log("Essssss:" +aux.length);
// }).catch(err => {
// 	console.log(err);
// })
// addImage('test.png', 'Figura 1', 130);
// console.log(reportImages.length);


// console.log(recorreMap('test.png', 'FIGURA 1', 130));
// recorreMap('test.png', 'FIGURA 1', 130);


// function getMyImages(){
// 	return new Promise((resolve, reject) => {
// 		recorreMap('test.png', 'FIGURA 1', 130);
// 		console.log('termina');
// 		resolve('Success');
// 	})
// }

// function result(){
// 	getMyImages().then((res) => {
// 		console.log(res);
// 		pdf.closePDF();
// 	})
// 	.catch(err =>{
// 		console.log(err);
// 	})
// }

// result();


// recorreMap('https://icons.iconarchive.com/icons/graphicloads/android-settings/16/plus-icon.png');
