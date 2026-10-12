import fs from 'fs';
import jpeg from 'jpeg-js';

const jpegData = fs.readFileSync('public/assets/rubinraj_original.jpg');
const rawData = jpeg.decode(jpegData, { useTArray: true });
const { width, height, data } = rawData;

function checkRow(y) {
  let leftBg = 0;
  while (leftBg < width && data[(y * width + leftBg) * 4] > 248 && data[(y * width + leftBg) * 4 + 1] > 248 && data[(y * width + leftBg) * 4 + 2] > 248) {
    leftBg++;
  }
  let rightBg = width - 1;
  while (rightBg >= 0 && data[(y * width + rightBg) * 4] > 248 && data[(y * width + rightBg) * 4 + 1] > 248 && data[(y * width + rightBg) * 4 + 2] > 248) {
    rightBg--;
  }
  const midX = Math.floor(width / 2);
  const midIdx = (y * width + midX) * 4;
  console.log(`Row y=${y}: Subject from x=${leftBg} to x=${rightBg}. Width of subject: ${rightBg - leftBg}. Mid pixel: R=${data[midIdx]}, G=${data[midIdx+1]}, B=${data[midIdx+2]}`);
}

checkRow(200);
checkRow(400);
checkRow(600);
checkRow(750);
checkRow(900);
checkRow(1000);
