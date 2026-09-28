const fs = require('fs');
['src/routes/index.tsx', 'src/routes/cursos.index.tsx', 'src/routes/login.tsx'].forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/to="\/signup"/g, 'to="/signup" search={{ redirect: undefined }}');
    // Also fix any duplicate search if login.tsx already had it
    content = content.replace(/search={{ redirect: undefined }} search={{ redirect: undefined }}/g, 'search={{ redirect: undefined }}');
    fs.writeFileSync(f, content, 'utf8');
  }
});
