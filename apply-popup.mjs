import fs from 'fs';

let idx = fs.readFileSync('src/routes/index.tsx', 'utf8');

if (!idx.includes('import popupPresaleImg')) {
  idx = idx.replace('import mentoriaFlixImg from "@/assets/mentoria-flix.png";', 'import mentoriaFlixImg from "@/assets/mentoria-flix.png";\nimport popupPresaleImg from "@/assets/popup-presale.jpg";');
}

const oldPopup = \<DialogContent className="sm:max-w-lg text-center p-10 border-coral border-2 shadow-2xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-coral/10 mb-4 animate-bounce">
            <CalendarClock className="h-10 w-10 text-coral" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-3xl font-black font-display text-center mb-4 uppercase tracking-wide text-coral">Pré-Venda Liberada!</DialogTitle>
            <DialogDescription className="text-center text-lg text-foreground/90 font-medium">
              Garanta sua vaga com desconto na primeira turma do curso de <strong className="text-coral text-xl block mt-2">Ortopedia Avançada</strong>
              <br/><br/>
              Aproveite a condição especial de lançamento: <br/>De <span className="line-through text-red-400">R$ 2.800</span> por apenas <strong className="text-green-600 text-2xl">R$ 2.300</strong> até o dia <strong>23/11/2026</strong>.
              <br/><br/>
              <span className="inline-block bg-primary text-white p-3 px-6 rounded-xl font-bold mt-2 shadow-lg text-lg animate-pulse">
                Início das aulas: 18/11/2026
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center mt-6">
            <Button asChild size="lg" className="w-full h-12 bg-coral hover:bg-coral/90 text-white font-bold" onClick={() => setShowPreSalePopup(false)}>
              <a href="#oferta">Aproveitar o Desconto</a>
            </Button>
          </DialogFooter>
        </DialogContent>\;

const newPopup = \<DialogContent className="sm:max-w-lg p-0 border-0 overflow-hidden bg-transparent shadow-2xl">
          <a href="#oferta" onClick={() => setShowPreSalePopup(false)} className="block relative group">
            <img src={popupPresaleImg} alt="Pré-venda Liberada" className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button size="lg" className="bg-coral text-white font-bold rounded-xl shadow-2xl">Aproveitar Desconto</Button>
            </div>
          </a>
        </DialogContent>\;

idx = idx.replace(oldPopup, newPopup);

fs.writeFileSync('src/routes/index.tsx', idx, 'utf8');
console.log('Fixed popup');
