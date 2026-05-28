import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessagesSquare, Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

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
    content: "Alguém já testou o novo protocolo com Oclacitinib em felinos com dermatite atópica? Estou lendo alguns artigos recentes mas queria saber da experiência prática de vocês.",
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
    content: "Acabei de adicionar um novo material complementar na aula de 'Manejo de Insuficiência Cardíaca Congestiva'. Tem um PDF com o fluxograma atualizado do consenso de 2025. Não deixem de conferir na aba de Materiais do curso!",
    likes: 89,
    comments: 3,
    time: "Ontem",
    liked: false
  }
];

export const Route = createFileRoute("/_authenticated/app/community")({
  head: () => ({ meta: [{ title: "Comunidade — VetClass Pro" }] }),
  component: CommunityPage,
});

function CommunityPage() {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [newPost, setNewPost] = useState("");

  const handleLike = (id: number) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    
    const post = {
      id: Date.now(),
      author: {
        name: "Você (Aluno)",
        avatar: "https://i.pravatar.cc/150?u=voce",
        specialty: "Clínica Geral",
        role: "Aluna"
      },
      content: newPost,
      likes: 0,
      comments: 0,
      time: "Agora",
      liked: false
    };
    
    setPosts([post, ...posts]);
    setNewPost("");
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
                  placeholder="Compartilhe um caso clínico, dúvida ou novidade..." 
                  className="min-h-[100px] resize-none bg-secondary/50 border-transparent focus:border-coral"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-coral">
                    <ImageIcon className="mr-2 h-4 w-4" /> Foto/Exame
                  </Button>
                  <Button onClick={handlePost} className="bg-coral text-coral-foreground hover:bg-coral/90">
                    <Send className="mr-2 h-4 w-4" /> Publicar
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
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${post.author.role === 'Professor' ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                          {post.author.role}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{post.author.specialty} • {post.time}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>
                
                <p className="text-sm leading-relaxed text-foreground/90 mb-4">
                  {post.content}
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleLike(post.id)}
                    className={post.liked ? "text-coral hover:text-coral/80 hover:bg-coral/10" : "text-muted-foreground"}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${post.liked ? "fill-current" : ""}`} /> {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
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
          
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-5 shadow-soft">
            <h3 className="font-display font-semibold text-primary mb-2">Comunidade Premium</h3>
            <p className="text-xs text-muted-foreground mb-4">Lembre-se de seguir as regras da comunidade ao postar casos clínicos reais. Oculte informações sensíveis de tutores.</p>
            <Button variant="outline" size="sm" className="w-full text-xs border-primary/20 text-primary hover:bg-primary/10">Ler Regras</Button>
          </div>
        </aside>

      </div>
    </div>
  );
}
