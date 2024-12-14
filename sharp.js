const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targets = [
  {
    src: path.resolve(__dirname, 'src/public/images'),
    dest: path.resolve(__dirname, 'dist/images'),
  },
  {
    src: path.resolve(__dirname, 'src/public/images/heros'),
    dest: path.resolve(__dirname, 'dist/images/heros'),
  },
];

targets.forEach(({ src: target, dest: destination }) => {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true }); // subfolder dibuat jika belum ada
  }

  fs.readdirSync(target).forEach((image) => {
    const imagePath = path.join(target, image);

    // hanya memproses file gambar, bukan folder
    if (fs.lstatSync(imagePath).isFile()) {
      // mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
      sharp(imagePath)
        .resize(800)
        .toFile(
          path.resolve(
            __dirname,
            `${destination}/${image
              .split('.')
              .slice(0, -1)
              .join('.')}-large.jpg`
          )
        );

      // mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
      sharp(imagePath)
        .resize(480)
        .toFile(
          path.resolve(
            __dirname,
            `${destination}/${image
              .split('.')
              .slice(0, -1)
              .join('.')}-small.jpg`
          )
        );
    }
  });
});
