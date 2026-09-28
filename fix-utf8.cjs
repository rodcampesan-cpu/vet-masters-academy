const fs = require('fs');
const files = [
  'src/routes/index.tsx',
  'src/routes/cursos_..tsx',
  'src/routes/cursos.index.tsx',
  'src/routes/checkout..tsx',
  'src/routes/_authenticated/app/courses..tsx',
  'src/lib/courses-data.ts'
];
const map = {
  'Ã©': 'é', 'Ã£': 'ã', 'Ã³': 'ó', 'Ã­': 'í', 'Ã§': 'ç', 'Ãµ': 'õ', 
  'Ãª': 'ê', 'Ã¡': 'á', 'Ã¢': 'â', 'Ãº': 'ú', 'Â©': '©', 'Ãƒ': 'Ã',
  'Ã‡': 'Ç', 'Ã€': 'À', 'Ã‚': 'Â', 'Ã‰': 'É', 'Ã“': 'Ó', 'Ã­': 'í',
  'Ã ': 'à', 'Ãˆ': 'È', 'Ã’': 'Ò', 'Ãš': 'Ú', 'Ã»': 'û', 'Â ': ' '
};
files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    let changed = false;
    for (const [bad, good] of Object.entries(map)) {
      if (content.includes(bad)) {
        content = content.split(bad).join(good);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(f, content, 'utf8');
      console.log('Fixed: ' + f);
    }
  }
});
