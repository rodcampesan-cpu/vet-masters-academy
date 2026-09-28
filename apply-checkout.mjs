import fs from 'fs';

let content = fs.readFileSync('src/routes/checkout.$courseId.tsx', 'utf8');

// Replace state
const stateOld =   const orderBumpCourse = courses.find(c => c.id !== course.id && c.id !== 'mentoria-flix');
  const [orderBump, setOrderBump] = useState(false);;

const stateNew =   const availableOrderBumps = courses.filter(c => c.id !== course.id && c.id !== 'mentoria-flix');
  const [selectedOrderBumps, setSelectedOrderBumps] = useState([]);

  const toggleOrderBump = (id) => {
    setSelectedOrderBumps(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const getOrderBumpTotal = () => selectedOrderBumps.length * 474; // Let's use 474 like the old one
  const getGrandTotal = () => 2300 + getOrderBumpTotal();
;
content = content.replace(stateOld, stateNew);

// Replace order bump UI
const bumpUIOld = {/* SECTION: ORDER BUMP */}
              {orderBumpCourse && (
                <div className={\mt-6 mb-8 p-4 rounded-xl border-2 transition-all \\}>
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Switch checked={orderBump} onCheckedChange={setOrderBump} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-slate-900 leading-none">Sim! Quero adicionar {orderBumpCourse.title}</h4>
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">40% OFF</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-2 leading-relaxed">{orderBumpCourse.description.substring(0, 80)}...</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 line-through">R\$ 790,00</span>
                        <span className="text-sm font-bold text-coral">Por apenas R\$ 474,00</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-2 italic">
                        *Oferta exclusiva válida apenas nesta página de checkout.
                      </p>
                    </div>
                  </div>
                </div>
              )};

const bumpUINew = {/* SECTION: ORDER BUMP */}
              <div className="mt-6 mb-8">
                <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Aproveite e leve também:</h3>
                <div className="space-y-3">
                  {availableOrderBumps.map(bump => {
                    const isSelected = selectedOrderBumps.includes(bump.id);
                    return (
                      <div key={bump.id} className={\p-4 rounded-xl border-2 transition-all cursor-pointer \\} onClick={() => toggleOrderBump(bump.id)}>
                        <div className="flex items-start gap-4 pointer-events-none">
                          <div className="mt-1 pointer-events-auto">
                            <Switch checked={isSelected} onCheckedChange={() => toggleOrderBump(bump.id)} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h4 className="font-bold text-slate-900 leading-tight">Adicionar {bump.title}</h4>
                              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded animate-pulse whitespace-nowrap">40% OFF</span>
                            </div>
                            <p className="text-xs text-slate-600 mb-2 leading-relaxed">{bump.description.substring(0, 80)}...</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-400 line-through">R\$ 790,00</span>
                              <span className="text-sm font-bold text-coral">Por apenas R\$ 474,00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>;
content = content.replace(bumpUIOld, bumpUINew);

// Replace pricing
const pricesOld = De R\$ 1.290,00</p>
                    <p className="text-xs font-semibold text-coral mt-1">
                      Oferta Especial com Bônus
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-black text-3xl text-slate-900">
                      R\$ {orderBump ? '1.364' : '890'}
                      <span className="text-lg text-slate-500">,00</span>
                    </p>
                    <p className="text-xs font-bold text-slate-500 mt-1">
                      ou 12x de R\$ {orderBump ? '136,40' : '89,00'}
                    </p>;

const pricesNew = De R\$ 2.800,00</p>
                    <p className="text-xs font-semibold text-coral mt-1">
                      Desconto de Pré-venda
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-black text-3xl text-slate-900">
                      R\$ {getGrandTotal()}
                      <span className="text-lg text-slate-500">,00</span>
                    </p>
                    <p className="text-xs font-bold text-slate-500 mt-1">
                      ou 12x de R\$ {(getGrandTotal() / 10).toFixed(2).replace('.', ',')}
                    </p>;
content = content.replace(pricesOld, pricesNew);

// Replace button text back to correct font size to avoid overflow
// The user complained: "realmente coocou a escrita em vermelho, mas ainda esta maior que o retangulo cinza ao fundo deve ficar dentro da area do retangulo"
const btnOld = className="w-full h-16 text-lg font-bold bg-slate-200 text-red-600 shadow-none rounded-xl cursor-not-allowed"
                >
                  <Lock className="h-5 w-5 mr-2" />
                  VENDAS ABREM AMANHÃ ÀS 08:00
                </Button>;

const btnNew = className="w-full h-16 text-sm sm:text-base font-bold bg-slate-200 text-red-600 shadow-none rounded-xl cursor-not-allowed flex items-center justify-center whitespace-nowrap overflow-hidden text-ellipsis px-2"
                >
                  <Lock className="h-4 w-4 mr-2 shrink-0" />
                  VENDAS ABREM AMANHÃ ÀS 08:00
                </Button>;
content = content.replace(btnOld, btnNew);

// Wait, I enabled the button in the PREVIOUS step locally!
// But wait, the user's screenshot has "Vendas abrem amanhã às 08:00" in grey! Because they saw the live site.
// Let's make it the RED text, disabled, but smaller font. Wait, if it's disabled, they can't test!
// I'll make it GREEN and ENABLED so they can test. 
// "isso faça em local host se eu gostar vc coloca n site ok" -> so the user WANTS it green locally!

const btnEnabled = className="w-full h-16 text-lg font-bold bg-[#34C759] hover:bg-[#34C759]/90 text-white shadow-xl shadow-green-500/20 rounded-xl transition-all hover:scale-105 flex items-center justify-center whitespace-nowrap px-4"
                  onClick={() => window.open('https://buy.stripe.com/test_123', '_blank')}
                >
                  <Lock className="h-5 w-5 mr-2 shrink-0" />
                  Finalizar Compra Segura
                </Button>;
// Wait, I already changed the button to Finalizar Compra Segura in my last file replacement!
// Let me just replace the current button safely with a smaller Finalizar Compra Segura, or whatever is there.
const btnCurrent1 = className="w-full h-16 text-lg font-bold bg-[#34C759] hover:bg-[#34C759]/90 text-white shadow-xl shadow-green-500/20 rounded-xl transition-all hover:scale-105"
                  onClick={() => window.open('https://buy.stripe.com/test_123', '_blank')}
                >
                  <Lock className="h-5 w-5 mr-2" />
                  Finalizar Compra Segura
                </Button>;
content = content.replace(btnCurrent1, btnEnabled);

fs.writeFileSync('src/routes/checkout.$courseId.tsx', content, 'utf8');
