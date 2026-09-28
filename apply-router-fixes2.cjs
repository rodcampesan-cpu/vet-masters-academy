const fs = require('fs');
let content = fs.readFileSync('src/routes/index.tsx', 'utf8');
content = content.replace(/to="\/signup"/g, 'to="/signup" search={{ redirect: undefined }}');
fs.writeFileSync('src/routes/index.tsx', content, 'utf8');

let c2 = fs.readFileSync('src/routes/cursos.index.tsx', 'utf8');
c2 = c2.replace(/to="\/signup"/g, 'to="/signup" search={{ redirect: undefined }}');
fs.writeFileSync('src/routes/cursos.index.tsx', c2, 'utf8');
