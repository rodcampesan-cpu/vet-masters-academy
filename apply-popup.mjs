import fs from 'fs';

let content = fs.readFileSync('src/routes/index.tsx', 'utf8');

// Add Dialog imports
if (!content.includes('DialogContent')) {
  content = content.replace('import { Accordion', 'import { Dialog, DialogContent } from "@/components/ui/dialog";\nimport { Accordion');
}

// Add useState/useEffect
if (!content.includes('useState')) {
  content = 'import { useState, useEffect } from "react";\n' + content;
}

// Add state to component
const stateStr =   const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 3000);
    return () => clearTimeout(timer);
  }, []);
;
content = content.replace('function Landing() {\n  return (', 'function Landing() {\n' + stateStr + '\n  return (');

// Add popup jsx
const popupJSX = 
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="sm:max-w-md p-0 border-none bg-transparent shadow-none overflow-hidden">
          <Link to="/cursos/ortopedia-avancada" className="block w-full h-full hover:scale-105 transition-transform">
            <img src={popupPresaleImg} alt="Pré-venda" className="w-full h-auto rounded-2xl shadow-2xl" />
          </Link>
        </DialogContent>
      </Dialog>
;
content = content.replace('      <Navbar />', '      <Navbar />\n' + popupJSX);

fs.writeFileSync('src/routes/index.tsx', content, 'utf8');
