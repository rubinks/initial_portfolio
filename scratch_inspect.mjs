import fs from 'fs';
import jpeg from 'jpeg-js';

const jpegData = fs.readFileSync('public/assets/rubinraj_original.jpg');
const rawData = jpeg.decode(jpegData, { useTArray: true });

console.log('Image dimensions:', rawData.width, 'x', rawData.height);
console.log('Sample top-left pixel (0,0):', 
  rawData.data[0], rawData.data[1], rawData.data[2], rawData.data[3]);
console.log('Sample top-right pixel (width-1, 0):', 
  rawData.data[(rawData.width - 1) * 4], 
  rawData.data[(rawData.width - 1) * 4 + 1], 
  rawData.data[(rawData.width - 1) * 4 + 2]);
console.log('Sample middle-top pixel (width/2, 10):',
  rawData.data[(10 * rawData.width + Math.floor(rawData.width / 2)) * 4],
  rawData.data[(10 * rawData.width + Math.floor(rawData.width / 2)) * 4 + 1],
  rawData.data[(10 * rawData.width + Math.floor(rawData.width / 2)) * 4 + 2]);
