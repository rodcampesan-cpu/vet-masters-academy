import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessagesSquare, Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon, Send, X, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { toast } from "sonner";

// Mock Data para a Comunidade
const MOCK_POSTS = [
  {
    id: 1,
    author: {
      name: "Dr. Carlos Mendes",
      avatar: "https://i.pravatar.cc/150?u=carlos",
      specialty: "Ortopedia",
      role: "Professor"
    },
    content: "Pessoal, caso interessante hoje: luxação patelar grau IV em Spitz Alemão. Optei pela técnica de transposição da crista da tíbia combinada com aprofundamento do sulco troclear. A recuperação costuma ser excelente. Alguém tem preferência por outra abordagem nesses casos severos?",
    tag: "Ortopedia",
    image: "https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 34,
    comments: 12,
    time: "2 horas atrás",
    liked: false
  },
  {
    id: 2,
    author: {
      name: "Dra. Ana Sousa",
      avatar: "https://i.pravatar.cc/150?u=ana",
      specialty: "Dermatologia",
      role: "Aluna"
    },
    content: "Alguém já testou o novo protocolo com Oclacitinib em felinos com dermatite atópica? Estou lendo alguns artigos recentes mas queria saber da experiência prática de vocês com os efeitos colaterais a longo prazo.",
    tag: "Dermatologia",
    image: null,
    likes: 15,
    comments: 8,
    time: "5 horas atrás",
    liked: true
  },
  {
    id: 3,
    author: {
      name: "Dr. Roberto Almeida",
      avatar: "https://i.pravatar.cc/150?u=roberto",
      specialty: "Cardiologia",
      role: "Professor"
    },
    content: "Raio-x de tórax de um paciente canino de 12 anos apresentando tosse crônica e sopro grau IV/VI. Observem o aumento do átrio esquerdo e os sinais de congestão venosa pulmonar. Iniciei furosemida e pimobendan. O que acham?",
    tag: "Casos Cirúrgicos",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 89,
    comments: 3,
    time: "Ontem",
    liked: false
  }
];

const MOCK_COMMENTS = [
  { id: 1, author: "Dra. Juliana", role: "Professora", text: "Excelente condução do caso! Nessas situações severas, a transposição é de fato a melhor escolha para evitar recidivas." },
  { id: 2, author: "Lucas (Aluno)", role: "Aluno", text: "Professor, qual o tempo médio de repouso absoluto que você recomenda pós-cirúrgico?" },
  { id: 3, author: "Dr. Carlos Mendes", role: "Professor", text: "Oi Lucas! Geralmente recomendo 30 dias de restrição severa (caixa/cercadinho), seguido de fisioterapia." }
];

export const Route = createFileRoute("/_authenticated/app/community")({
  head: () => ({ meta: [{ title: "Comunidade — VetClass Pro" }] }),
  component: CommunityPage,
});

function CommunityPage() {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [newPost, setNewPost] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("Geral");
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [activePostComments, setActivePostComments] = useState<number | null>(null);

  const TAGS = ['Geral', 'Ortopedia', 'Dermatologia', 'Casos Cirúrgicos', 'Farmacologia', 'Urgência'];

  const handleLike = (id: number) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));
  };

  const handleAttachImage = () => {
    // Simulação de upload de foto clínica
    setAttachedImage("https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");
    toast.success("Foto clínica anexada com sucesso!");
  };

  const handlePost = () => {
    if (!newPost.trim() && !attachedImage) return;
    
    const post = {
      id: Date.now(),
      author: {
        name: "Você (Aluno)",
        avatar: "https://i.pravatar.cc/150?u=voce",
        specialty: "Clínica Geral",
        role: "Aluna"
      },
      content: newPost,
      tag: selectedTag,
      image: attachedImage,
      likes: 0,
      comments: 0,
      time: "Agora",
      liked: false
    };
    
    setPosts([post, ...posts]);
    setNewPost("");
    setAttachedImage(null);
    setSelectedTag("Geral");
    toast.success("Caso publicado na comunidade!");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-coral text-coral-foreground">
          <MessagesSquare className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">Comunidade</h1>
          <p className="text-sm text-muted-foreground">Discuta casos, tire dúvidas e faça networking.</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        
        {/* Main Feed */}
        <div className="space-y-6">
          
          {/* Create Post */}
          <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/150?u=voce" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea 
                  placeholder="Descreva o caso clínico, anamnese, sinais ou dúvidas..." 
                  className="min-h-[100px] resize-none bg-secondary/50 border-transparent focus:border-coral"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                
                {attachedImage && (
                  <div className="relative inline-block mt-2">
                    <img src={attachedImage} alt="Anexo Clínico" className="h-32 rounded-xl object-cover border border-border" />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={() => setAttachedImage(null)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  {TAGS.map(tag => (
                    <Badge 
                      key={tag} 
                      variant={selectedTag === tag ? "default" : "outline"}
                      className={`cursor-pointer ${selectedTag === tag ? "bg-coral text-white hover:bg-coral/90" : "hover:bg-secondary"}`}
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-coral" onClick={handleAttachImage}>
                    <ImageIcon className="mr-2 h-4 w-4" /> Anexar Exame/Foto
                  </Button>
                  <Button onClick={handlePost} className="bg-coral text-coral-foreground hover:bg-coral/90">
                    <Send className="mr-2 h-4 w-4" /> Publicar Caso
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-display font-semibold text-foreground">{post.author.name}</p>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${post.author.role === 'Professor' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                          {post.author.role}
                        </span>
                        {post.tag && post.tag !== "Geral" && (
                          <Badge variant="outline" className="text-[10px] h-5 border-coral/30 text-coral bg-coral/5">
                            {post.tag}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{post.author.specialty} • {post.time}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>
                
                <p className="text-sm leading-relaxed text-foreground/90 mb-4 whitespace-pre-wrap">
                  {post.content}
                </p>

                {post.image && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-border">
                    <img src={post.image} alt="Caso Clínico" className="w-full h-auto max-h-[400px] object-cover" />
                  </div>
                )}

                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleLike(post.id)}
                    className={post.liked ? "text-coral hover:text-coral/80 hover:bg-coral/10" : "text-muted-foreground"}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${post.liked ? "fill-current" : ""}`} /> {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => setActivePostComments(post.id)}>
                    <MessageCircle className="mr-2 h-4 w-4" /> {post.comments} Comentários
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground ml-auto">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h3 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Tópicos em Alta</h3>
            <div className="space-y-3">
              {['Ortopedia', 'Dermatologia', 'Casos Cirúrgicos', 'Farmacologia', 'Diagnóstico por Imagem'].map((tag, i) => (
                <div key={i} className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm font-medium group-hover:text-coral transition-colors">#{tag}</span>
                  <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 50) + 5} posts</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h3 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-500" /> Destaques da Semana
            </h3>
            <div className="space-y-4">
              {[
                { name: "Dr. Carlos Mendes", role: "Professor", pts: 120, img: "https://i.pravatar.cc/150?u=carlos" },
                { name: "Mariana Souza", role: "Aluna", pts: 85, img: "https://i.pravatar.cc/150?u=mari" },
                { name: "Dra. Ana Sousa", role: "Aluna", pts: 64, img: "https://i.pravatar.cc/150?u=ana" }
              ].map((user, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.img} />
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-[10px] text-muted-foreground">{user.role}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs font-bold">{user.pts} pts</Badge>
                </div>
              ))}
            </div>
          </div>
          
          <div className="rounded-2xl border border-border bg-slate-900 text-white p-5 shadow-soft">
            <h3 className="font-display font-semibold text-coral mb-2">Comunidade Premium</h3>
            <p className="text-xs text-slate-400 mb-4">Lembre-se de seguir as regras da comunidade ao postar casos clínicos reais. Oculte informações sensíveis de tutores e animais.</p>
            <Button variant="outline" size="sm" className="w-full text-xs border-slate-700 hover:bg-slate-800 text-white">Ler Código de Conduta</Button>
          </div>
        </aside>

      </div>

      {/* DRAWER LATERAL DE COMENTÁRIOS */}
      <Sheet open={activePostComments !== null} onOpenChange={(open) => !open && setActivePostComments(null)}>
        <SheetContent className="w-full sm:max-w-md md:max-w-lg overflow-y-auto bg-slate-50 p-0 border-l border-slate-200">
          <div className="bg-white p-6 border-b border-border sticky top-0 z-10">
            <SheetHeader>
              <SheetTitle className="text-xl font-display text-slate-800">Discussão do Caso</SheetTitle>
              <SheetDescription>
                Professores e alunos debatendo a melhor conduta médica.
              </SheetDescription>
            </SheetHeader>
          </div>
          
          <div className="p-6 space-y-6">
            {MOCK_COMMENTS.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar className="h-10 w-10 border border-slate-200">
                  <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-slate-800">{comment.author}</span>
                      <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${comment.role === 'Professor' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                        {comment.role}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{comment.text}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 ml-2">
                    <button className="text-xs text-slate-400 hover:text-coral font-medium">Responder</button>
                    <button className="text-xs text-slate-400 hover:text-coral font-medium flex items-center gap-1"><Heart className="h-3 w-3" /> Curtir</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-white border-t border-border sticky bottom-0">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://i.pravatar.cc/150?u=voce" />
              </Avatar>
              <div className="flex-1 relative">
                <Textarea 
                  placeholder="Escreva sua opinião ou dúvida..." 
                  className="min-h-[80px] resize-none pr-12 focus:border-coral"
                />
                <Button size="icon" className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-coral hover:bg-coral/90 text-white">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
