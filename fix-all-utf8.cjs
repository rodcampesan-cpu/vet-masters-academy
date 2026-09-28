const fs = require('fs');
const glob = require('glob'); // Note: glob is not installed maybe, I'll just use a simple recursive read

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('.vite')) {
        results = results.concat(walk(file));
      }
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src');

// Map of common corruptions
const map = {
  'Ã¢â‚¬â€ ': '—',
  'a?a\'O': 'ÇÃO',
  'a?': 'É',
  'aao': 'ção',
  'aa': 'çã',
  'a': 'í',
  'a': 'ç',
  // Actually, wait, let me just fix login.tsx manually, it's easier and safer
};
