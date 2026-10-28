const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
async function main() {
  const photo = path.join(root, 'assets/images/profile.jpg');
  if (!fs.existsSync(photo)) {
    throw new Error(
      'Falta assets/images/profile.jpg. Añade tu fotografía real y vuelve a ejecutar npm run profile:icon.',
    );
  }
  const res = path.join(root, 'android/app/src/main/res');
  for (const [density, size] of Object.entries({
    mdpi: 48,
    hdpi: 72,
    xhdpi: 96,
    xxhdpi: 144,
    xxxhdpi: 192,
  })) {
    const dir = path.join(res, 'mipmap-' + density);
    fs.mkdirSync(dir, { recursive: true });
    for (const name of ['ic_launcher', 'ic_launcher_round']) {
      await sharp(photo)
        .resize(size, size, { fit: 'cover' })
        .png()
        .toFile(path.join(dir, name + '.png'));
    }
  }
  await sharp(photo)
    .resize(432, 432, { fit: 'cover' })
    .extend({
      top: 108,
      bottom: 108,
      left: 108,
      right: 108,
      background: '#102344',
    })
    .png()
    .toFile(path.join(res, 'drawable', 'ic_launcher_foreground.png'));
  const p = path.join(root, 'src/constants/profile.ts');
  fs.writeFileSync(
    p,
    fs
      .readFileSync(p, 'utf8')
      .replace(
        /photo:\s*undefined/,
        "photo:require('../../assets/images/profile.jpg')",
      ),
  );
  console.log(
    'Fotografía y recursos Android actualizados. Reconstruye el APK.',
  );
}
main().catch(e => {
  console.error(e.message);
  process.exit(1);
});
