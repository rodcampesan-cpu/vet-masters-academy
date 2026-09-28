import fs from 'fs';

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const replacements = {
    'Ã£': 'ã',
    'Ã§': 'ç',
    'Ã¡': 'á',
    'Ã³': 'ó',
    'Ã©': 'é',
    'Ã­': 'í',
    'Ãº': 'ú',
    'Ãª': 'ê',
    'Ãµ': 'õ',
    'Ã¢': 'â',
    'Ã(': 'À', // wait
    'Ã€': 'À',
    'Ã\x8D': 'Í',
    'Ã\x9A': 'Ú',
    'Ã\x87': 'Ç',
    'Ã\x89': 'É',
    'Ã\x81': 'Á',
    'Ã\x83': 'Ã',
    'Ã\x95': 'Õ',
    'Ã\x8A': 'Ê',
    'Ã\x93': 'Ó',
    'Ã\x82': 'Â',
    'Ã\x80': 'À'
  };

  for (const [bad, good] of Object.entries(replacements)) {
    content = content.split(bad).join(good);
  }
  
  // also specifically fix Â  which is non breaking space
  content = content.split('Â').join('');

  fs.writeFileSync(file, content, 'utf8');
}

fixFile('src/routes/index.tsx');
fixFile('src/lib/courses-data.ts');
console.log('Fixed files');
